defmodule LaibraryWeb.Book.Cover do
  use LaibraryWeb, :live_view

  def mount(%{"book_id" => book_id, "floor_id" => floor_id, "shelf_id" => shelf_id}, _session, socket) do
    book = Laibrary.Book.get_book(book_id)
    {:ok, assign(socket, book: book, floor_id: floor_id, shelf_id: shelf_id)}
  end

  def render(assigns) do
    ~H"""
    <h2><%= @book.title %></h2>

    <.link navigate={~p"/library/floor/#{@floor_id}/shelf/#{@shelf_id}/book/#{@book.id}/page/#{@book.first_page_id}"}>
      Start Reading
    </.link>
    """
  end
end
