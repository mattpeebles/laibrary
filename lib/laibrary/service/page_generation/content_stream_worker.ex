defmodule Laibrary.Service.ContentStreamWorker do
  use GenServer

  alias Laibrary.Service.PageContentOrchestrator
  alias Laibrary.Service.OpenAiService

  def start_link(%{page_id: page_id, liveview_pid: liveview_pid, prompt: prompt}) do
    name = via(page_id)
    {:ok, _} = GenServer.start_link(__MODULE__, %{page_id: page_id, liveview_pid: liveview_pid, prompt: prompt}, name: name)
  end

  def via(page_id), do: {:via, Registry, {Laibrary.Registry, {:content_stream_worker, page_id}}}

  @impl true
  def init(state) do
    IO.inspect("Initializing content stream worker")
    {:ok, task_pid} = Task.start_link(fn -> stream_openai(state.liveview_pid, state.page_id, state.prompt) end)
    IO.inspect("Task started with PID: #{inspect(task_pid)}")
    {:ok, state}
  end

  defp stream_openai(liveview_pid, page_id, _prompt) do
    IO.inspect("Starting page content orchestrator")

    case PageContentOrchestrator.start_link(%{page_id: page_id, liveview_pid: liveview_pid}) do
      {:ok, orchestrator_pid} ->
        IO.inspect("Orchestrator started, starting stream service")
        case OpenAiService.start_stream(100, orchestrator_pid) do
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
