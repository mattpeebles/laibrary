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
        :content,
        :book_title
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

  def handle_info({:page_content_chunk, chunk}, socket) do
    new_content = (&((&1 || "") <> chunk)).(socket.assigns.content)
    cleaned_content = String.replace(new_content, "\\n", "\n")
    {:noreply, assign(socket, :content, cleaned_content)}
  end

  def handle_info({:stream_done, {%PageSchema{} = finalized_page, content}}, socket) do
    {:noreply,
    socket
    |> assign(:next_page_id, finalized_page.next_page_id)
    |> assign(:content, content)}
     end

  def render(assigns) do
    ~H"""
    <div class="flex justify-center items-center mb-6 w-full">
      <h3 class="text-gl font-bold">
        <.link navigate={~p"/book/#{@book_id}"} class="hover:underline">
          {@book_title}
        </.link>
      </h3>
    </div>



    <div class="whitespace-pre-line flex-grow flex flex-col overflow-y-scroll">
      <%= raw(String.replace(@content, "\n", "<br>")) %>
    </div>

    <div class="flex justify-between items-center mb-6">
      <%= if @previous_page_id do %>
        <.link navigate={~p"/book/#{@book_id}/page/#{@previous_page_id}"} class="w-full text-left">
          Previous Page
        </.link>
      <% else %>
        <.link navigate={~p"/book/#{@book_id}"} class="w-full text-left">
          Previous Page
        </.link>
      <% end %>

      <div class="w-full text-center">
        {@page_number}
      </div>

      <%= if @next_page_id do %>
        <.link navigate={~p"/book/#{@book_id}/page/#{@next_page_id}"} class="w-full text-right">
          Next Page
        </.link>
      <% else %>
        <div class="w-full"></div>
      <% end %>
    </div>
    """
  end
end
