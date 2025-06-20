defmodule LaibraryWeb.Library.Shelf do
  use LaibraryWeb, :live_view

  def mount(%{"shelf_id" => shelf_id}, _session, socket) do
    shelf = Laibrary.Bookcase.Shelf.get_shelf(shelf_id)
    {:ok, assign(socket, shelf: shelf)}
  end

  def render(assigns) do
    ~H"""
    <.breadcrumbs breadcrumbs={@shelf.navigation.breadcrumbs} />

    <div class="grid grid-cols-4 gap-4">
      <%= for book <- @shelf.books do %>
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
