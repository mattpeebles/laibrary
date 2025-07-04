# TODO: this is also gross, temporary just to flesh out the logic for everything
# but this ai service just needs to conform to the open ai stream events
# so that the orchestrator can handle the mappings appropirately

defmodule Laibrary.Service.OpenAiPageContentService do
  use GenServer

  alias Laibrary.Book
  alias Laibrary.Page
  alias Laibrary.Service.OpenAI
  require Logger

  defstruct [
    :target_pid,
    :page_deltas,
    :page_acc,
    :book,
    :page,
    :done?,
    :stream_task_ref,
    :sse_parser,
    :previous_page
  ]

  @type state :: %__MODULE__{
          target_pid: pid(),
          page_deltas: [%{}],
          page_acc: String.t(),
          book: Book.t(),
          page: Page.t(),
          done?: boolean(),
          stream_task_ref: reference(),
          sse_parser: SSEParser.t(),
          previous_page: Page.t()
        }

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts)
  end

  def start_stream(target_pid \\ self(), book_id, page_id) do
    book = Book.get_book(book_id)
    page = Page.get_page(page_id)
    previous_page = Page.get_page(page.previous_page_id)

    opts = [
      target_pid: target_pid,
      book: book,
      page: page,
      previous_page: previous_page
    ]

    GenServer.start_link(__MODULE__, opts)
  end

  # Server
  @impl true
  def init(opts) do
    Process.flag(:trap_exit, true)

    state = %__MODULE__{
      target_pid: Keyword.fetch!(opts, :target_pid),
      page_deltas: [],
      page_acc: "",
      book: Keyword.fetch!(opts, :book),
      page: Keyword.fetch!(opts, :page),
      sse_parser: %SSEParser{target_pid: self()},
      previous_page: Keyword.fetch!(opts, :previous_page)
    }

    {:ok, state, {:continue, :start_stream}}
  end

  @impl true
  def handle_continue(:start_stream, state) do
    id = self()

    {:ok, previous_page_content} = Page.get_page_content(state.previous_page)

    {:ok, pid} =
      Task.start_link(fn ->
        OpenAI.Response.stream(
          id,
          "pmpt_6866f0b6b1d0819593ee1d25ae1704e60c19744474ba11a2",
          nil,
          %{
            "title" => state.book.title,
            "description" => state.book.summary,
            "outline" => Jason.encode!(state.book.outline),
            "page_number" => state.page.page_number |> to_string(),
            "tone" => "",
            "genre" => "",
            "force_end" => "false",
            "previous_page" => previous_page_content,
          }
        )
      end)

    # Monitor the task so you know when it ends
    ref = Process.monitor(pid)
    {:noreply, Map.put(%{state | done?: false}, :stream_task_ref, ref), {:continue, :stream_started}}
  end

  @impl true
  def handle_continue(:stream_started, state) do
    {:noreply, state}
  end

  @impl true
  def handle_info({:openai_chunk, chunk}, state) do
    new_parser = SSEParser.feed(state.sse_parser, chunk)
    {:noreply, %{state | sse_parser: new_parser}}
  end

  @impl true
  def handle_info(
        {{:response, :completed},
         %{"response" => %{"output" => [%{"content" => [%{"text" => json_content}]}]}}},
        state
      ) do
    IO.inspect(json_content, label: "JSON Content")

    with {:ok, content} <- Jason.decode(json_content),
         page_content <- content["page_content"],
         is_final <- content["is_final_page"] do
      Logger.info("Stream done")
      send(state.target_pid, {:stream_done, {page_content, is_final}})
      {:stop, :normal, %{state | done?: true}}
    else
      {:error, reason} ->
        Logger.error("Error decoding JSON content: #{inspect(reason)}")
        {:stop, :normal, %{state | done?: true}}
    end
  end

  @impl true
  def handle_info(
        {{:response, :output_text, :delta}, %{} = delta},
        state
      ),
      do: send_chunk(state, delta, delta["delta"])

  @impl true
  def handle_info({{:response, event_type}, payload}, state) do
    IO.inspect(event_type, label: "Unhandled OpenAI Event Type")
    IO.inspect(payload, label: "Unhandled OpenAI Event Payload")
    {:noreply, state}
  end

  @impl true
  def handle_info({{:response, event_type, event_subtype}, payload}, state) do
    IO.inspect(event_type, label: "Unhandled OpenAI Event Type")
    IO.inspect(event_subtype, label: "Unhandled OpenAI Event Subtype")
    IO.inspect(payload, label: "Unhandled OpenAI Event Payload")
    {:noreply, state}
  end

  @impl true
  def handle_info({:EXIT, _pid, :normal}, state) do
    {:noreply, state}
  end

  @impl true
  def handle_info({:DOWN, _ref, :process, _pid, _reason}, %{done?: true} = state) do
    # Clean exit: we received all messages and task ended
    Logger.info("Stream task completed")
    {:stop, :normal, state}
  end

  @impl true
  def handle_info({:DOWN, _ref, :process, _pid, reason}, state) do
    # Task ended too early
    Logger.warning("Stream task exited before completion; waiting for completion... #{inspect(reason)}")
    {:noreply, %{state | stream_task_ref: nil}}
  end


  defp send_chunk(state, delta, content) do
    acc = state.page_acc
    new_acc = acc <> content

    if is_json_delta?("page_content", acc, new_acc) do
      IO.inspect(content, label: "Sending page content chunk")
      send(state.target_pid, {:page_content_chunk, content})
    else
      IO.inspect(new_acc, label: "Ignoring delta")
    end

    {:noreply, %{state | page_deltas: state.page_deltas ++ [delta], page_acc: new_acc}}
  end

  defp is_json_delta?(key, acc, new_acc) do
    # TODO: this is a hack to get the json delta to work
    # introduce json parsing library similar to
    # https://github.com/karminski/streaming-json-py
    (String.starts_with?(acc, "{\"#{key}\":\"") or
       String.starts_with?(acc, "{\"#{key}\": \"") or
       String.starts_with?(acc, "{ \"#{key}\": \"") or
       String.starts_with?(acc, "{ \"#{key}\":\"")) and
      (not String.ends_with?(new_acc, "\"}") and
         not String.ends_with?(new_acc, "\" }"))
  end

  @impl true
  def terminate(reason, _state) do
    IO.inspect(reason, label: "PageContentService Terminated")
    :ok
  end


end
