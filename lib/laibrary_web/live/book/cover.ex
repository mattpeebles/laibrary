defmodule LaibraryWeb.Book.Cover do
  use LaibraryWeb, :live_view

  def mount(%{"book_id" => book_id}, _session, socket) do
    {:ok, {book, first_page}} = Laibrary.Book.get_book(book_id)

    if connected?(socket) do
      Laibrary.Book.generate_cover(book_id, self())
    end

    {:ok, assign(socket, book: book, first_page: first_page, title: book.title || "", summary: book.summary || "")}
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
    <.link navigate={~p"/shelf/#{@book.shelf_id}"}>
      Back to Shelf
    </.link>

    <h2><%= @title %></h2>

    <div>
      <%= @summary %>
    </div>

    <.link navigate={~p"/book/#{@book.id}/page/#{@first_page.id}"}>
      Start Reading
    </.link>
    """
  end
end
