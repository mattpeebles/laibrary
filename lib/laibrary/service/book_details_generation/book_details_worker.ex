defmodule Laibrary.Service.BookDetailsWorker do
  use GenServer

  alias Laibrary.Service.BookDetailsOrchestrator
  alias Laibrary.Service.OpenAiBookDetailsService

  def start_link(%{book_id: book_id, liveview_pid: liveview_pid}) do
    {:ok, _server_pid} = GenServer.start_link(__MODULE__, %{book_id: book_id, liveview_pid: liveview_pid}, name: via(book_id))
  end

  def via(book_id), do: {:via, Registry, {Laibrary.Registry, {:book_details_worker, book_id}}}

  @impl true
  def init(state) do
    {:ok, _task_pid} = Task.start_link(fn -> stream_openai(state.liveview_pid, state.book_id) end)
    {:ok, state}
  end

  defp stream_openai(liveview_pid, book_id) do
    case BookDetailsOrchestrator.start_link(%{book_id: book_id, liveview_pid: liveview_pid}) do
      {:ok, orchestrator_pid} ->
        case OpenAiBookDetailsService.start_stream(orchestrator_pid) do
          {:ok, _stream_pid} ->
            {:ok, :stream_started}
          {:error, reason} -> {:error, reason}
        end
      {:error, reason} ->
        {:error, reason}
    end
  end
end
