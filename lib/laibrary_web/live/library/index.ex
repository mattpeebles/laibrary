defmodule LaibraryWeb.Library.Index do
  use LaibraryWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, library} = Laibrary.Library.get_library(nil)
    {:ok, floor} = Laibrary.Floor.get_or_create_random_floor(library.id)
    {:ok, assign(socket, floor: floor)}
  end

  @spec render(any()) :: Phoenix.LiveView.Rendered.t()
  def render(assigns) do
    ~H"""
    <h1>Library</h1>
    <div class="grid grid-cols-4 gap-4">
      <div class="border p-4 rounded shadow">
        <.link navigate={~p"/floor/#{@floor.id}"}>
          Enter Library
        </.link>
      </div>
    </div>
    """
  end
end
