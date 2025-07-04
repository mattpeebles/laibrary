defmodule Laibrary.Service.ContentStreamWorker do
  use GenServer

  alias Laibrary.Service.PageContentOrchestrator
  alias Laibrary.Service.OpenAiPageContentService

  def start_link(%{page_id: page_id, book_id: book_id, liveview_pid: liveview_pid, prompt: prompt}) do
    name = via(page_id)
    {:ok, _} = GenServer.start_link(__MODULE__, %{page_id: page_id, book_id: book_id, liveview_pid: liveview_pid, prompt: prompt}, name: name)
  end

  def via(page_id), do: {:via, Registry, {Laibrary.Registry, {:content_stream_worker, page_id}}}

  @impl true
  def init(opts) do
    state = %{page_id: opts[:page_id], book_id: opts[:book_id], liveview_pid: opts[:liveview_pid], prompt: opts[:prompt]}
    {:ok, state, {:continue, :start_stream}}
  end

  @impl true
  def handle_continue(:start_stream, state) do
    stream_openai(state.liveview_pid, state.page_id, state.book_id, state.prompt)
    Process.send_after(self(), :stream_timeout, 30_000)
    {:noreply, state}
  end

  @impl true
  def handle_info(:stream_timeout, state) do
    {:stop, :normal, state}
  end

  defp stream_openai(liveview_pid, page_id, book_id, _prompt) do
    case PageContentOrchestrator.start_link(%{page_id: page_id, liveview_pid: liveview_pid, book_id: book_id}) do
      {:ok, orchestrator_pid} ->
        case OpenAiPageContentService.start_stream(orchestrator_pid, book_id, page_id) do
          {:ok, _stream_pid} ->
            IO.inspect(orchestrator_pid, label: "Content Stream Worker Orchestrator PID")
            {:ok, :stream_started}
          {:error, reason} ->
            {:error, reason}
        end
      {:error, reason} ->
        {:error, reason}
    end
  end
end
