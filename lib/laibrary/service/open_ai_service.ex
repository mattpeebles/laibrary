defmodule Laibrary.Service.OpenAiService do
  use GenServer

  alias Laibrary.Service.MockContent

  defstruct [:chunks, :interval_ms, :target_pid, :index, :content]

  @type state :: %__MODULE__{
          chunks: [String.t()],
          interval_ms: pos_integer(),
          target_pid: pid(),
          index: non_neg_integer(),
          content: String.t()
        }

  # API

  def start_link(opts) do
    content = generate_content()
    chunks = chunk_content(content)
    opts = opts ++ [chunks: chunks, content: content]
    GenServer.start_link(__MODULE__, opts, name: opts[:name] || :via_tuple_or_nil)
  end

  def start_stream(interval_ms, target_pid \\ self()) do
    start_link(interval_ms: interval_ms, target_pid: target_pid)
  end

  # Server

  @impl true
  def init(opts) do
    chunks = Keyword.fetch!(opts, :chunks)
    interval_ms = Keyword.fetch!(opts, :interval_ms)
    target_pid = Keyword.fetch!(opts, :target_pid)
    content = Keyword.fetch!(opts, :content)

    state = %__MODULE__{
      chunks: chunks,
      interval_ms: interval_ms,
      target_pid: target_pid,
      index: 0,
      content: content
    }

    IO.inspect(state)
    send(self(), :stream_next)
    {:ok, state}
  end


  @impl true
  def handle_info(:stream_next, %__MODULE__{index: i, chunks: chunks} = state) do
    if i < length(chunks) do
      chunk = Enum.at(chunks, i)
      IO.inspect(chunk)
      send(state.target_pid, {:stream_chunk, chunk})

      Process.send_after(self(), :stream_next, state.interval_ms)

      {:noreply, %{state | index: i + 1}}
    else
      send(state.target_pid, {:stream_done, {state.content, false}})
      {:stop, :normal, state}
    end
  end

  defp chunk_content(content) do
    content
    |> String.split("\n")
    |> Enum.map(&(&1 <> "\n"))
  end

  defp generate_content() do
    for _ <- 1..Enum.random(5..20), into: "", do: MockContent.gibberish_sentence(2..10) <> "\n"
  end
end
