defmodule Laibrary.Service.ContentServer do
  use GenServer

  defstruct [:chunks, :interval_ms, :target_pid, :index]

  @type state :: %__MODULE__{
          chunks: [String.t()],
          interval_ms: pos_integer(),
          target_pid: pid(),
          index: non_neg_integer()
        }

  # API

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: opts[:name] || :via_tuple_or_nil)
  end

  def start_stream(chunks, interval_ms, target_pid \\ self()) do
    start_link(chunks: chunks, interval_ms: interval_ms, target_pid: target_pid)
  end

  # Server

  @impl true
  def init(chunks: chunks, interval_ms: interval_ms, target_pid: target_pid) do
    state = %__MODULE__{
      chunks: chunks,
      interval_ms: interval_ms,
      target_pid: target_pid,
      index: 0
    }

    send(self(), :stream_next)
    {:ok, state}
  end

  @impl true
  def handle_info(:stream_next, %__MODULE__{index: i, chunks: chunks} = state) do
    if i < length(chunks) do
      chunk = Enum.at(chunks, i)
      send(state.target_pid, {:stream_chunk, chunk})

      Process.send_after(self(), :stream_next, state.interval_ms)

      {:noreply, %{state | index: i + 1}}
    else
      {:stop, :normal, state}
    end
  end
end
