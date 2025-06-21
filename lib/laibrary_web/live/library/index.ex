defmodule LaibraryWeb.Library.Index do
  use LaibraryWeb, :live_view
  alias Laibrary.Runtime.MapGenerator

  def mount(_params, _session, socket) do
    {:ok, library} = Laibrary.Library.get_library(nil)
    {:ok, room} = MapGenerator.ensure_library(library.id)
    {:ok, assign(socket, room: room)}
  end

  @spec render(any()) :: Phoenix.LiveView.Rendered.t()
  def render(assigns) do
    ~H"""
    <h1>Library</h1>
    <div class="grid grid-cols-4 gap-4">
      <div class="border p-4 rounded shadow">
        <.link navigate={~p"/room/#{@room.id}"}>
          Enter Library
        </.link>
      </div>
    </div>
    """
  end
end
