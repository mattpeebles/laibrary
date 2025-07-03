#TODO: this is also gross, temporary just to flesh out the logic for everything
# but this ai service just needs to conform to the open ai stream events
# so that the orchestrator can handle the mappings appropirately

defmodule Laibrary.Service.MockOpenAiBookDetailsService do
  use GenServer

  alias Laibrary.Service.MockContent

  defstruct [:title_chunks, :summary_chunks, :interval_ms, :target_pid, :title_index, :summary_index, :title, :summary]

  @type state :: %__MODULE__{
          title_chunks: [String.t()],
          summary_chunks: [String.t()],
          interval_ms: pos_integer(),
          target_pid: pid(),
          title_index: non_neg_integer(),
          summary_index: non_neg_integer(),
          title: String.t(),
          summary: String.t()
        }

  def start_stream(interval_ms, target_pid \\ self(), name \\ nil) do
    title = generate_title()
    summary = generate_summary()
    title_chunks = chunk_content(title)
    summary_chunks = chunk_content(summary)

    opts = [
      interval_ms: interval_ms,
      target_pid: target_pid,
      title_chunks: title_chunks,
      summary_chunks: summary_chunks,
      title: title,
      summary: summary
    ]

    if name do
      GenServer.start_link(__MODULE__, opts, name: name)
    else
      GenServer.start_link(__MODULE__, opts)
    end
  end

  # Server

  @impl true
  def init(opts) do
    title_chunks = Keyword.fetch!(opts, :title_chunks)
    summary_chunks = Keyword.fetch!(opts, :summary_chunks)
    interval_ms = Keyword.fetch!(opts, :interval_ms)
    target_pid = Keyword.fetch!(opts, :target_pid)
    title = Keyword.fetch!(opts, :title)
    summary = Keyword.fetch!(opts, :summary)

    state = %__MODULE__{
      title_chunks: title_chunks,
      summary_chunks: summary_chunks,
      interval_ms: interval_ms,
      target_pid: target_pid,
      title_index: 0,
      summary_index: 0,
      title: title,
      summary: summary
    }

    send(self(), :stream_next)
    {:ok, state}
  end


  @impl true
  def handle_info(:stream_next, %__MODULE__{title_index: title_index, summary_index: summary_index, title_chunks: title_chunks, summary_chunks: summary_chunks} = state) do
    title_done = title_index >= length(title_chunks)
    summary_done = summary_index >= length(summary_chunks)

    cond do
      # If both are done, finish the stream
      title_done and summary_done ->
        send(state.target_pid, {:stream_done, {state.title, state.summary}})
        {:stop, :normal, state}

      # If title is not done, send next title chunk
      not title_done ->
        title_chunk = Enum.at(title_chunks, title_index)
        send(state.target_pid, {:title_chunk, title_chunk})
        Process.send_after(self(), :stream_next, state.interval_ms)
        {:noreply, %{state | title_index: title_index + 1}}

      # If summary is not done, send next summary chunk
      not summary_done ->
        summary_chunk = Enum.at(summary_chunks, summary_index)
        send(state.target_pid, {:summary_chunk, summary_chunk})
        Process.send_after(self(), :stream_next, state.interval_ms)
        {:noreply, %{state | summary_index: summary_index + 1}}
    end
  end

  defp chunk_content(content) do
    content
    |> String.split("\n")
    |> Enum.map(&(&1 <> "\n"))
  end

  defp generate_title(), do: MockContent.gibberish_name() <> MockContent.gibberish_name()

  defp generate_summary() do
    for _ <- 1..Enum.random(5..10), into: "", do: MockContent.gibberish_sentence(2..10) <> "\n"
  end
end
