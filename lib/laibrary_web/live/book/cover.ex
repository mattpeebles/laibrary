defmodule LaibraryWeb.Book.Cover do
  use LaibraryWeb, :live_view

  def mount(%{"book_id" => book_id}, _session, socket) do
    book = Laibrary.Book.get_book(book_id)
    {:ok, assign(socket, book: book)}
  end

  def render(assigns) do
    ~H"""
    <.breadcrumbs breadcrumbs={@book.navigation.breadcrumbs} />
    <h2><%= @book.title %></h2>

    <.link navigate={~p"/book/#{@book.id}/page/#{@book.first_page_id}"}>
      Next Page
    </.link>
    """
  end
end
