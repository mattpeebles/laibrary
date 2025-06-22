defmodule Laibrary.Service.BookDetailsOrchestrator do
  use GenServer

  require Logger
  alias Laibrary.Book

  def start_link(%{book_id: book_id, liveview_pid: liveview_pid}) do
    GenServer.start_link(__MODULE__, %{book_id: book_id, liveview_pid: liveview_pid}, name: via(book_id))
  end

  def via(book_id), do: {:via, Registry, {Laibrary.Registry, {:orchestrator_book, book_id}}}

  @impl true
  def init(state) do
    {:ok, state}
  end


  @impl true
  def handle_info({:title_chunk, chunk}, state) do
    send(state.liveview_pid, {:title_chunk, chunk})
    {:noreply, state}
  end

  def handle_info({:summary_chunk, chunk}, state) do
    send(state.liveview_pid, {:summary_chunk, chunk})
    {:noreply, state}
  end

  def handle_info({:stream_done, response}, state) do
    IO.inspect(state)
    {title, summary} = response # TODO: this is gross, fix it
    book_id = state.book_id
    with {:ok, _} <- Book.finalize_book(book_id, title, summary) do # TODO: this is gross, fix it
      send(state.liveview_pid, {:stream_done, {title, summary}})
      {:stop, :normal, state}
    else
      err ->
        Logger.error("Streaming finalization failed: #{inspect(err)}")
        {:stop, :error, state}
    end
  end
end
