defmodule LaibraryWeb.Library.Floor do
  use LaibraryWeb, :live_view

  def mount(%{"floor_id" => floor_id}, _session, socket) do
    {:ok, {floor, navigation}} = Laibrary.Floor.get_floor(floor_id)
    {:ok, assign(socket, floor: floor, navigation: navigation)}
  end

  def render(assigns) do
    ~H"""
    <.breadcrumbs breadcrumbs={@navigation.breadcrumbs} />

    <h1>Floor <%= @floor.id %></h1>
    <div class="grid grid-cols-4 gap-4">
      <%= for bookcase <- @floor.bookcases do %>
        <div class="border p-4 rounded shadow">
          <.link navigate={~p"/bookcase/#{bookcase.id}"}>
            Open Bookcase #{bookcase.id}
          </.link>
        </div>
      <% end %>
    </div>
    <div class="flex justify-between items-center mb-6">
      <%= if @floor.previous_floor_id do %>
        <.link navigate={~p"/floor/#{@floor.previous_floor_id}"}>
          Previous Floor
        </.link>
      <% end %>
      <%= if @floor.next_floor_id do %>
        <.link navigate={~p"/floor/#{@floor.next_floor_id}"}>
          Next Floor
        </.link>
      <% end %>
    </div>
    """
  end
end
