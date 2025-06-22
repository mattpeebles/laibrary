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
    {:ok, _task_pid} = Task.start_link(fn -> stream_openai(state.liveview_pid, state.page_id, state.prompt) end)
    {:ok, state}
  end

  defp stream_openai(liveview_pid, page_id, _prompt) do
    case PageContentOrchestrator.start_link(%{page_id: page_id, liveview_pid: liveview_pid}) do
      {:ok, orchestrator_pid} ->
        case OpenAiService.start_stream(100, orchestrator_pid) do
          {:ok, _stream_pid} ->
            {:ok, :stream_started}
          {:error, reason} ->
            {:error, reason}
        end
      {:error, reason} ->
        {:error, reason}
    end
  end
end
