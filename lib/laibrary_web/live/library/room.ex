defmodule LaibraryWeb.Library.Room do
  use LaibraryWeb, :live_view

  def mount(%{"room_id" => room_id}, _session, socket) do
    {:ok, {room, bookcases, room_links}} = Laibrary.Room.enter_room(room_id)
    {:ok, assign(socket, room: room, bookcases: bookcases, room_links: room_links)}
  end

  def handle_event("travel_to_target", %{"room_link_id" => room_link_id}, socket) do
    {:ok, room} = Laibrary.Runtime.MapGenerator.travel_to_target(room_link_id)
    {:noreply,
    push_navigate(socket,
      to: ~p"/room/#{room.id}"
    )}
  end

  def render(assigns) do
    ~H"""
    <h1>Room {@room.name}</h1>
    <div class="grid grid-cols-4 gap-4">
      <%= for bookcase <- @bookcases do %>
        <div class="border p-4 rounded shadow">
          <.link navigate={~p"/bookcase/#{bookcase.id}"}>
            Open Bookcase #{bookcase.id}
          </.link>
        </div>
      <% end %>
    </div>
    <div class="flex justify-between items-center mb-6">
      <%= if @room_links do %>
        <%= for room_link <- @room_links do %>
          <%= if room_link.link_type == "stairs" do %>
            <%= if room_link.target_room_id do %>
              <.link navigate={~p"/room/#{room_link.target_room_id}"}>
                Stairs {room_link.direction}
              </.link>
            <% else %>
              <button phx-click="travel_to_target" phx-value-room_link_id={room_link.id}>
                Stairs {room_link.direction}
              </button>
            <% end %>
          <% end %>
        <% end %>
      <% end %>
    </div>
    """
  end
end
