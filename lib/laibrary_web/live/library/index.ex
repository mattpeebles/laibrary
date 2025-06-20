defmodule LaibraryWeb.Library.Index do
  use LaibraryWeb, :live_view

  def mount(_params, _session, socket) do
    floors = Laibrary.Library.list_floors()
    {:ok, assign(socket, floors: floors)}
  end

  def render(assigns) do
    ~H"""
    <h1>Library</h1>
    <div class="grid grid-cols-4 gap-4">
      <%= for floor <- @floors do %>
        <div class="border p-4 rounded shadow">
          <.link navigate={~p"/library/floor/#{floor.id}"}>
            Open Floor #{floor.id}
          </.link>
        </div>
      <% end %>
    </div>
    """
  end
end
