defmodule LaibraryWeb.Library.Shelf do
  use LaibraryWeb, :live_view

  def mount(%{"shelf_id" => shelf_id}, _session, socket) do
    {:ok, {shelf, books}} = Laibrary.Shelf.get_shelf(shelf_id, self())
    {:ok, assign(socket, shelf: shelf, books: books)}
  end

  def handle_info({:book_created, book}, socket) do
    {:noreply, update(socket, :books, fn books -> [book | books] end)}
  end

  def render(assigns) do
    ~H"""
    <div class="grid grid-cols-4 gap-4">
      <%= for book <- @books do %>
        <div class="border p-4 rounded shadow">
          <.link navigate={~p"/book/#{book.id}"}>
            <%= if book.title do %>
              <%= book.title %>
            <% else %>
              Open Book <%= book.id %>
            <% end %>
          </.link>
        </div>
      <% end %>
    </div>
    """
  end
end
