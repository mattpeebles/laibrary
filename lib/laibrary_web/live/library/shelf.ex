defmodule LaibraryWeb.Library.Shelf do
  use LaibraryWeb, :live_view

  def mount(%{"shelf_id" => shelf_id, "floor_id" => floor_id}, _session, socket) do
    books = Laibrary.Library.list_books(shelf_id)
    {:ok, assign(socket, books: books, shelf_id: shelf_id, floor_id: floor_id)}
  end

  def render(assigns) do
    ~H"""
    <h1>Shelf <%= @shelf_id %></h1>
    <div class="grid grid-cols-4 gap-4">
      <%= for book <- @books do %>
        <div class="border p-4 rounded shadow">
          <.link navigate={~p"/library/floor/#{@floor_id}/shelf/#{@shelf_id}/book/#{book.id}"}>
            <%= if book.title do %>
              <%= book.title %>
            <% else %>
              Open Book <%= book.id %>
            <% end %>
          </.link>
        </div>
      <% end %>
    </div>
    <div class="flex justify-between items-center mb-6">
      <.link navigate={~p"/library/floor/#{@floor_id}"}>
        Back
      </.link>
    </div>
    """
  end
end
