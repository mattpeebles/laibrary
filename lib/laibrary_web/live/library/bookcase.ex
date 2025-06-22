defmodule LaibraryWeb.Library.Bookcase do
  use LaibraryWeb, :live_view

  def mount(%{"bookcase_id" => bookcase_id}, _session, socket) do
    case Laibrary.Bookcase.get_bookcase_for_view(bookcase_id, self()) do
      {:static, {bookcase, shelves}} ->
        {:ok, assign(socket, bookcase: bookcase, shelves: shelves)}

      {:streaming, {bookcase, shelves}} ->
        {:ok, assign(socket, bookcase: bookcase, shelves: shelves)}
    end
  end

  def handle_info({:shelf_created, shelf}, socket) do
    {:noreply, update(socket, :shelves, fn shelves -> shelves ++ [shelf] end)}
  end

  def render(assigns) do
    ~H"""
    <.link navigate={~p"/room/#{@bookcase.room_id}"}>
      Back to Room
    </.link>

    <h1>Bookcase</h1>
    <div class="grid grid-cols-4 gap-4">
      <%= for shelf <- @shelves do %>
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
