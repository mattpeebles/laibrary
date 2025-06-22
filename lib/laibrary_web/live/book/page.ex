defmodule LaibraryWeb.Book.Page do
  use LaibraryWeb, :live_view
  alias Laibrary.Book.PageSchema
  def mount(%{"page_id" => page_id, "book_id" => book_id}, _session, socket) do
    {:ok, {page, public_url, next_page_id}} = Laibrary.Page.get_page(page_id)

    case public_url do
      nil ->
        if connected?(socket) do
          Laibrary.Page.start_streaming_content(page_id, self())
        end
        {:ok, assign(socket, page: page, content: "", book_id: book_id, next_page_id: next_page_id)}

      _ ->
        case Req.get(public_url) do
          {:ok, %Req.Response{status: 200, body: body}} ->
            {:ok, assign(socket, page: page, content: body, book_id: book_id, next_page_id: next_page_id)}

          {:error, reason} ->
            {:ok, assign(socket, page: page, content: "Failed to fetch: #{inspect(reason)}", book_id: book_id, next_page_id: next_page_id)}
        end

    end
  end

  def handle_info({:stream_chunk, chunk}, socket) do
    {:noreply, update(socket, :content, &((&1 || "") <> chunk))}
  end

  def handle_info({:stream_done, %PageSchema{} = finalized_page}, socket) do
    {:noreply, update(socket, :next_page_id, fn _ -> finalized_page.next_page_id end)}
  end

  def render(assigns) do
    ~H"""
    <div style="white-space: pre-wrap;">
      <%= @content %>
    </div>

    <div class="flex justify-between items-center mb-6">
    <%= if @page.previous_page_id do %>
      <.link navigate={~p"/book/#{@book_id}/page/#{@page.previous_page_id}"}>
        Previous Page
      </.link>
    <% else %>
      <.link navigate={~p"/book/#{@book_id}"}>
      Previous Page
    </.link>
    <% end %>

    <%= if @next_page_id do %>
        <.link navigate={~p"/book/#{@book_id}/page/#{@next_page_id}"}>
          Next Page
        </.link>
      <% end %>

    </div>
    """
  end
end
