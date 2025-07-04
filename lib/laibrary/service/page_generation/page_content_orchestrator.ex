defmodule Laibrary.Service.PageContentOrchestrator do
  use GenServer

  require Logger
  alias Laibrary.Page

  def start_link(%{page_id: page_id, liveview_pid: liveview_pid, book_id: book_id}) do
    GenServer.start_link(__MODULE__, %{page_id: page_id, liveview_pid: liveview_pid, book_id: book_id}, name: via(page_id))
  end

  def via(page_id), do: {:via, Registry, {Laibrary.Registry, {:orchestrator_page, page_id}}}

  @impl true
  def init(state) do
    {:ok, Map.merge(state, %{buffer: "", is_final: false})}
  end


  @impl true
  def handle_info({:page_content_chunk, chunk}, state) do
    send(state.liveview_pid, {:page_content_chunk, chunk})
    {:noreply, state}
  end

  def handle_info({:stream_done, response}, %{page_id: page_id, book_id: book_id} = state) do
    s3_key = "pages/#{book_id}/#{page_id}.txt"
    {content, is_final} = response # TODO: this is gross, fix it
    with :ok <- upload_to_s3(s3_key, content),
         {:ok, finalized_page} <- Page.finalize_page(page_id, s3_key, is_final) do
      send(state.liveview_pid, {:stream_done, {finalized_page, content}})
      {:stop, :normal, state}
    else
      err ->
        Logger.error("Streaming finalization failed: #{inspect(err)}")
        {:stop, :error, state}
    end
  end

  defp upload_to_s3(key, content) do
    ExAws.S3.put_object("laibrarypages", key, content)
    |> ExAws.request()
    |> case do
      {:ok, _} -> :ok
      err -> {:error, err} |> Logger.error("Upload to S3 failed")
    end
    :ok
  end
end
