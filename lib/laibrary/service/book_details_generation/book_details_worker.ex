defmodule Laibrary.Service.BookDetailsWorker do
  use GenServer

  alias Laibrary.Service.BookDetailsOrchestrator
  alias Laibrary.Service.OpenAiBookDetailsService

  def start_link(%{book_id: book_id, liveview_pid: liveview_pid}) do
    IO.inspect("Starting book details worker")
    GenServer.start_link(__MODULE__, %{book_id: book_id, liveview_pid: liveview_pid}, name: via(book_id))
  end

  def via(book_id), do: {:via, Registry, {Laibrary.Registry, {:book_details_worker, book_id}}}

  @impl true
  def init(state) do
    IO.inspect("Initializing book details worker")
    {:ok, task_pid} = Task.start_link(fn -> stream_openai(state.liveview_pid, state.book_id) end)
    IO.inspect("Task started with PID: #{inspect(task_pid)}")
    {:ok, state}
  end

  defp stream_openai(liveview_pid, book_id) do
    IO.inspect("Starting book details orchestrator")

    case BookDetailsOrchestrator.start_link(%{book_id: book_id, liveview_pid: liveview_pid}) do
      {:ok, orchestrator_pid} ->
        IO.inspect("Orchestrator started, starting stream service")
        case OpenAiBookDetailsService.start_stream(100, orchestrator_pid) do
          {:ok, _stream_pid} ->
            IO.inspect("Stream service started successfully")
          {:error, reason} ->
            IO.inspect("Failed to start stream service: #{inspect(reason)}")
        end
      {:error, reason} ->
        IO.inspect("Failed to start orchestrator: #{inspect(reason)}")
    end
  end
end
