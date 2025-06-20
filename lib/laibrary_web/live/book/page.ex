defmodule LaibraryWeb.Book.Page do
  use LaibraryWeb, :live_view

  def mount(%{"page_id" => page_id, "book_id" => book_id, "floor_id" => floor_id, "shelf_id" => shelf_id}, _session, socket) do
    page = Laibrary.Page.get_page(page_id)

    IO.inspect(page.content)
    IO.inspect(connected?(socket))
    if page.content == nil && connected?(socket) do
      IO.inspect("Streaming content")
      Laibrary.Page.start_streaming_content(page_id, self())
    end

    {:ok, assign(socket, page: page, content: page.content || "", book_id: book_id, floor_id: floor_id, shelf_id: shelf_id)}
  end

  def handle_info({:stream_chunk, chunk}, socket) do
    {:noreply, update(socket, :content, &(&1 <> chunk))}
  end

  def handle_info(:stream_done, socket) do
    {:noreply, put_flash(socket, :info, "Page fully loaded")}
  end

  def render(assigns) do
    ~H"""
    <div style="white-space: pre-wrap;">
      <%= @content %>
    </div>

    <div class="flex justify-between items-center mb-6">
    <%= if @page.previous_page_id do %>
      <.link navigate={~p"/library/floor/#{@page.previous_page_id}"}>
        Previous Page
      </.link>
    <% else %>
      <.link navigate={~p"/library/floor/#{@floor_id}/shelf/#{@shelf_id}/book/#{@book_id}"}>
        Back to Book
      </.link>
    <% end %>

    <%= if @page.next_page_id do %>
        <.link navigate={~p"/library/floor/#{@floor_id}/shelf/#{@shelf_id}/book/#{@book_id}/page/#{@page.next_page_id}"}>
          Next Page
        </.link>
      <% end %>

    </div>
    """
  end
end
