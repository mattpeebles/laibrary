defmodule Laibrary.Service.PageContentOrchestrator do
  use GenServer

  require Logger
  alias Laibrary.Page

  def start_link(%{page_id: page_id, liveview_pid: liveview_pid}) do
    GenServer.start_link(__MODULE__, %{page_id: page_id, liveview_pid: liveview_pid}, name: via(page_id))
  end

  def via(page_id), do: {:via, Registry, {Laibrary.Registry, {:orchestrator, page_id}}}

  @impl true
  def init(%{page_id: page_id} = state) do
    Registry.register(Laibrary.Registry, {:orchestrator, page_id}, nil)
    {:ok, Map.merge(state, %{buffer: "", is_final: false})}
  end


  @impl true
  def handle_info({:stream_chunk, chunk}, state) do
    send(state.liveview_pid, {:stream_chunk, chunk})
    {:noreply, state}
  end

  def handle_info({:stream_done, response}, %{page_id: page_id} = state) do
    key = "pages/#{page_id}.txt"
    {content, is_final} = response # TODO: this is gross, fix it
    with :ok <- upload_to_s3(key, content),
         {:ok, finalized_page} <- Page.finalize_page(page_id, key, is_final) do
      send(state.liveview_pid, {:stream_done, finalized_page})
      {:stop, :normal, state}
    else
      err ->
        Logger.error("Streaming finalization failed: #{inspect(err)}")
        {:stop, :error, state}
    end
  end

  defp upload_to_s3(key, content) do
    IO.inspect(key)
    IO.inspect(content)
    # ExAws.S3.put_object("your-bucket", key, content)
    # |> ExAws.request()
    # |> case do
    #   {:ok, _} -> :ok
    #   err -> {:error, err}
    # end
    :ok
  end
end
