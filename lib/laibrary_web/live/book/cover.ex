defmodule LaibraryWeb.Book.Cover do
  use LaibraryWeb, :live_view

  def mount(%{"book_id" => book_id}, _session, socket) do
    {:ok, {book, first_page}} = Laibrary.Book.get_book(book_id)
    {:ok, assign(socket, book: book, first_page: first_page)}
  end

  def render(assigns) do
    ~H"""
    <h2><%= @book.title %></h2>

    <.link navigate={~p"/book/#{@book.id}/page/#{@first_page.id}"}>
      Next Page
    </.link>
    """
  end
end
