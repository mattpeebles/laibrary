# TODO: this is also gross, temporary just to flesh out the logic for everything
# but this ai service just needs to conform to the open ai stream events
# so that the orchestrator can handle the mappings appropirately

defmodule Laibrary.Service.OpenAiBookDetailsService do
  use GenServer

  alias Laibrary.Service.OpenAI
  require Logger

  defstruct [
    :target_pid,
    :title,
    :summary,
    :summary_deltas,
    :summary_acc,
    :title_deltas,
    :title_acc,
    :mode,
    :genre,
    :tone,
    :audience
  ]

  @type state :: %__MODULE__{
          target_pid: pid(),
          title: String.t(),
          summary: String.t(),
          summary_deltas: [%{}],
          summary_acc: String.t(),
          title_acc: String.t(),
          title_deltas: [%{}],
          mode: :title | :summary,
          genre: String.t(),
          tone: String.t(),
          audience: String.t()
        }

  @supported_genres [
    :fantasy,
    :mystery,
    :romance,
    :thriller,
    :sci_fi,
    :historical,
    :contemporary,
    :horror,
    :adventure,
    :literary
  ]
  @supported_audiences [:children, :young_adult, :adults, :all_ages]
  @supported_tones [
    :dark,
    :light,
    :humorous,
    :serious,
    :mysterious,
    :romantic,
    :adventurous,
    :melancholic,
    :uplifting,
    :suspenseful
  ]

  def start_stream(target_pid \\ self()) do
    opts = [
      target_pid: target_pid,
      title: "",
      summary: "",
      summary_deltas: [],
      summary_acc: "",
      mode: :summary,
      genre: Enum.random(@supported_genres) |> to_string(),
      tone: Enum.random(@supported_tones) |> to_string(),
      audience: Enum.random(@supported_audiences) |> to_string()
    ]

    {:ok, summary_stream_pid} = GenServer.start_link(__MODULE__, opts)

    OpenAI.Response.stream(
      summary_stream_pid,
      "pmpt_6865cdab3170819396bbdcae1ee3da0a024478a3abe3d369",
      nil,
      %{
        "genre" => opts[:genre],
        "tone" => opts[:tone],
        "audience" => opts[:audience]
      }
    )
  end

  defp generate_outline(state) do
    OpenAI.Response.create(
      "pmpt_6866e6ef5c6c819798aaa419349c3d3a07faad848ae9a056",
      nil,
      %{
        "genre" => state.genre,
        "tone" => state.tone,
        "audience" => state.audience,
        "title" => state.title,
        "description" => state.summary
      },
      true,
      :infinity # TODO: this is a poor UX, we should have a timeout
    )
  end

  # Server

  @impl true
  def init(opts) do
    target_pid = Keyword.fetch!(opts, :target_pid)
    title = Keyword.fetch!(opts, :title)
    summary = Keyword.fetch!(opts, :summary)

    state = %__MODULE__{
      target_pid: target_pid,
      title: title,
      summary: summary,
      summary_deltas: [],
      summary_acc: "",
      title_deltas: [],
      title_acc: "",
      mode: :summary,
      genre: Keyword.fetch!(opts, :genre),
      tone: Keyword.fetch!(opts, :tone),
      audience: Keyword.fetch!(opts, :audience)
    }

    {:ok, state}
  end

  @impl true
  def handle_info({:openai_chunk, chunk}, state) do
    OpenAI.EventParser.parse_chunk(chunk, self())
    {:noreply, state}
  end

  @impl true
  def handle_info(
        {{:response, :completed},
         %{"response" => %{"output" => [%{"content" => [%{"text" => json_content}]}]}}},
        %{mode: :summary} = state
      ) do
    with {:ok, content} <- Jason.decode(json_content),
         description <- content["description"] do
      OpenAI.Response.stream(
        self(),
        "pmpt_6865fdb4a37c8195b04c7b92e5b63b65041d983c23448361",
        nil,
        %{"description" => description}
      )

      {:noreply, %{state | mode: :title, summary: description}}
    else
      {:error, reason} ->
        Logger.error("Error decoding JSON content: #{inspect(reason)}")
        {:stop, :normal, state}
    end
  end

  @impl true
  def handle_info(
        {{:response, :completed},
         %{"response" => %{"output" => [%{"content" => [%{"text" => json_content}]}]}}},
        %{mode: :title} = state
      ) do
    with {:ok, content} <- Jason.decode(json_content),
         title <- content["title"] do
      {:ok, outline} = generate_outline(state)
      IO.inspect(outline, label: "Outline")
      send(state.target_pid, {:stream_done, {title, state.summary, outline}})
      {:stop, :normal, state}
    else
      {:error, reason} ->
        Logger.error("Error decoding JSON content: #{inspect(reason)}")
        {:stop, :normal, state}
    end
  end

  @impl true
  def handle_info(
        {{:response, :output_text, :delta}, %{} = delta},
        state
      ),
      do: send_chunk(state, delta, delta["delta"])

  @impl true
  def handle_info({{:response, event_type}, _payload}, state) do
    IO.inspect(event_type, label: "Unhandled OpenAI Event Type")
    {:noreply, state}
  end

  @impl true
  def handle_info({{:response, event_type, event_subtype}, _payload}, state) do
    IO.inspect(event_type, label: "Unhandled OpenAI Event Type")
    IO.inspect(event_subtype, label: "Unhandled OpenAI Event Subtype")
    {:noreply, state}
  end

  defp send_chunk(%{mode: :summary} = state, delta, content) do
    acc = state.summary_acc
    new_acc = acc <> content

    if is_json_delta?("description", acc, new_acc) do
      IO.inspect(content, label: "Sending summary chunk")
      send(state.target_pid, {:summary_chunk, content})
    else
      IO.inspect(new_acc, label: "Ignoring delta")
    end

    {:noreply, %{state | summary_deltas: state.summary_deltas ++ [delta], summary_acc: new_acc}}
  end

  defp send_chunk(%{mode: :title} = state, delta, content) do
    acc = state.title_acc
    new_acc = acc <> content

    if is_json_delta?("title", acc, new_acc) do
      IO.inspect(content, label: "Sending title chunk")
      send(state.target_pid, {:title_chunk, content})
    else
      IO.inspect(new_acc, label: "Ignoring delta")
    end

    {:noreply, %{state | title_deltas: state.title_deltas ++ [delta], title_acc: new_acc}}
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
end
