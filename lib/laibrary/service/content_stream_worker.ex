defmodule Laibrary.Service.ContentStreamWorker do
  use GenServer

  alias Laibrary.Service.PageContentOrchestrator
  alias Laibrary.Service.OpenAiService

  def start_link(%{page_id: page_id, liveview_pid: liveview_pid, prompt: prompt}) do
    GenServer.start_link(__MODULE__, %{page_id: page_id, liveview_pid: liveview_pid, prompt: prompt})
  end

  @impl true
  def init(state) do
    Task.start(fn -> stream_openai(state.liveview_pid, state.page_id, state.prompt) end)
    {:ok, state}
  end

  defp stream_openai(liveview_pid, page_id, _prompt) do
    {:ok, orchestrator_pid} = PageContentOrchestrator.start_link(%{page_id: page_id, liveview_pid: liveview_pid})
    OpenAiService.start_stream(100, orchestrator_pid)
  end
end
