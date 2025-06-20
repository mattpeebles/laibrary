defmodule LaibraryWeb.Library.Bookcase do
  use LaibraryWeb, :live_view

  def mount(%{"bookcase_id" => bookcase_id}, _session, socket) do
    bookcase = Laibrary.Bookcase.Bookcase.get_bookcase(bookcase_id)
    {:ok, assign(socket, bookcase: bookcase)}
  end

  def render(assigns) do
    ~H"""
    <.breadcrumbs breadcrumbs={@bookcase.navigation.breadcrumbs} />

    <h1>Bookcase</h1>
    <div class="grid grid-cols-4 gap-4">
      <%= for shelf <- @bookcase.shelves do %>
        <div class="border p-4 rounded shadow">
          <.link navigate={~p"/shelf/#{shelf.id}"}>
            Open Shelf <%= shelf.id %>
          </.link>
        </div>
      <% end %>
    </div>
    """
  end
end
