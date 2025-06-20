defmodule LaibraryWeb.Library.Floor do
  use LaibraryWeb, :live_view

  def mount(%{"floor_id" => floor_id}, _session, socket) do
    floor = Laibrary.Library.get_floor(floor_id)
    {:ok, assign(socket, floor: floor)}
  end

  def render(assigns) do
    ~H"""
    <h1>Floor <%= @floor.id %></h1>
    <div class="grid grid-cols-4 gap-4">
      <%= for shelf <- @floor.shelves do %>
        <div class="border p-4 rounded shadow">
          <.link navigate={~p"/library/floor/#{@floor.id}/shelf/#{shelf.id}"}>
            Open Shelf #{shelf.id}
          </.link>
        </div>
      <% end %>
    </div>
    <div class="flex justify-between items-center mb-6">
      <%= if @floor.id == 1 do %>
        <.link navigate={~p"/library"}>
          Library
        </.link>
      <% else %>
        <.link navigate={~p"/library/floor/#{@floor.previous_floor_id}"}>
          Previous Floor
        </.link>
      <% end %>
      <%= if @floor.next_floor_id do %>
        <.link navigate={~p"/library/floor/#{@floor.next_floor_id}"}>
          Next Floor
        </.link>
      <% end %>
    </div>
    """
  end
end
