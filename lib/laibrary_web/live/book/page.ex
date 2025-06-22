defmodule LaibraryWeb.Book.Page do
  use LaibraryWeb, :live_view
  alias Laibrary.Book.PageSchema

  defp assign_base(socket, page_info) do
    assign(
      socket,
      Map.take(page_info, [
        :page_id,
        :book_id,
        :next_page_id,
        :page_number,
        :previous_page_id,
        :content
      ])
    )
  end

  def mount(%{"page_id" => page_id, "book_id" => _book_id}, _session, socket) do
    case Laibrary.Page.load_page_for_view(page_id, self()) do
      {:streaming, page_info} ->
        {
          :ok,
          assign_base(socket, page_info)
        }

      {:static, page_info} ->
        {
          :ok,
          assign_base(socket, page_info)
        }

      {:error, page_info} ->
        {:ok, assign_base(socket, page_info)}
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
    <.link navigate={~p"/book/#{@book_id}"}>
      Back to Book
    </.link>

    <div style="white-space: pre-wrap;">
      {@content}
    </div>

    <div class="flex justify-between items-center mb-6">
      <%= if @previous_page_id do %>
        <.link navigate={~p"/book/#{@book_id}/page/#{@previous_page_id}"}>
          Previous Page
        </.link>
      <% else %>
        <.link navigate={~p"/book/#{@book_id}"}>
          Previous Page
        </.link>
      <% end %>

      <div>
        {@page_number}
      </div>

      <%= if @next_page_id do %>
        <.link navigate={~p"/book/#{@book_id}/page/#{@next_page_id}"}>
          Next Page
        </.link>
      <% else %>
        <div></div>
      <% end %>
    </div>
    """
  end
end
