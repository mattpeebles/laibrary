defmodule LaibraryWeb.Book.Cover do
  use LaibraryWeb, :live_view

  @thinking_thoughts ["Thinking...",
  "Pondering...",
  "Reflecting...",
  "Brainstorming...",
  "Generating book details..."
]

  defp assign_base(socket, book_details) do
    assign(socket,
      Map.take(book_details, [:book_id, :shelf_id, :first_page_id, :title, :summary])
      |> Map.put(:ready_to_be_read, false)
      |> Map.put(:generating_book_details, "")
    )
  end

  def mount(%{"book_id" => book_id}, _session, socket) do
    case Laibrary.Book.get_book_for_view(book_id, self()) do
      {:static, book_details} ->
        {:ok, assign_base(socket, book_details)}

      {:streaming, book_details} ->
        {:ok, assign_base(socket, book_details)}
    end
  end

  def handle_info({:title_chunk, chunk}, socket) do
    {:noreply, update(socket, :title, &((&1 || "") <> chunk))}
  end

  def handle_info({:summary_chunk, chunk}, socket) do
    {:noreply, update(socket, :summary, &((&1 || "") <> chunk))}
  end

  def handle_info({:stream_done, {title, summary}}, socket) do
    send(self(), {:ready_to_be_read})
    {:noreply, assign(socket, title: title, summary: summary)}
  end

  def handle_info({:loading, thought}, socket) do
    :timer.send_after(125, {:loading, thought, 0})
    {:noreply, socket}
  end

  def handle_info({:loading, thought, idx}, socket) do
    if socket.assigns.ready_to_be_read do
      {:noreply, socket}
    else

    content = Enum.at(@thinking_thoughts, thought) |> String.split("")
    curr_idx = rem(idx, length(content))
    next_thought = if curr_idx == length(content) - 1, do: rem(thought + 1, length(@thinking_thoughts)), else: thought
    :timer.send_after(125, {:loading, next_thought, curr_idx + 1})
    {:noreply, assign(socket, generating_book_details: Enum.take(content, curr_idx + 1))}
    end
  end

  def handle_info({:ready_to_be_read}, socket) do
    {:noreply, assign(socket, ready_to_be_read: true)}
  end

  def render(assigns) do
    ~H"""
    <.link navigate={~p"/shelf/#{@shelf_id}"}>
      Back to Shelf
    </.link>

    <h2><%= @title %></h2>

    <div>
      <%= @summary %>
    </div>

    <%= if @ready_to_be_read do %>
      <.link navigate={~p"/book/#{@book_id}/page/#{@first_page_id}"}>
        Start Reading
      </.link>
    <% else %>
      {@generating_book_details}
    <% end %>
    """
  end
end
