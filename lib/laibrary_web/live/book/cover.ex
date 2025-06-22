defmodule LaibraryWeb.Book.Cover do
  use LaibraryWeb, :live_view

  defp assign_base(socket, book_details) do
    assign(socket, Map.take(book_details, [:book_id, :shelf_id, :first_page_id, :title, :summary]))
  end

  def mount(%{"book_id" => book_id}, _session, socket) do
    case Laibrary.Book.get_book_for_view(book_id, self()) do
      {:static, book_details} ->
        {:ok, assign_base(socket, book_details)}

      {:streaming, book_details} ->
        {:ok, assign_base(socket, book_details)}
    end
  end

  def handle_info({:title_chunk, chunk}, socket) do
    {:noreply, update(socket, :title, &((&1 || "") <> chunk))}
  end

  def handle_info({:summary_chunk, chunk}, socket) do
    {:noreply, update(socket, :summary, &((&1 || "") <> chunk))}
  end

  def handle_info({:stream_done, {title, summary}}, socket) do
    {:noreply, assign(socket, title: title, summary: summary)}
  end

  def render(assigns) do
    ~H"""
    <.link navigate={~p"/shelf/#{@shelf_id}"}>
      Back to Shelf
    </.link>

    <h2><%= @title %></h2>

    <div>
      <%= @summary %>
    </div>

    <.link navigate={~p"/book/#{@book_id}/page/#{@first_page_id}"}>
      Start Reading
    </.link>
    """
  end
end
