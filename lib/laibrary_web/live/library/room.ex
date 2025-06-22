defmodule LaibraryWeb.Library.Room do
  use LaibraryWeb, :live_view

  defp assign_base(socket, room_details) do
    assign(
      socket,
      Map.take(room_details, [
        :room_id,
        :name,
        :bookcases,
        :room_links
      ])
    )
  end

  def mount(%{"room_id" => room_id}, _session, socket) do
    case Laibrary.Room.get_room_for_view(room_id, self()) do
      {:static, room_details} ->
        {:ok, assign_base(socket, room_details)}

      {:streaming, room_details} ->
        {:ok, assign_base(socket, room_details)}
    end
  end

  def handle_info({:bookcase_created, bookcase}, socket) do
    {:noreply, update(socket, :bookcases, fn bookcases -> bookcases ++ [bookcase] end)}
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
    <h1>Room {@name}</h1>
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
