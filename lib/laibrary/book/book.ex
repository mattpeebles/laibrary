defmodule Laibrary.Book do
  import Ecto.Query
  alias Laibrary.Repo
  alias Laibrary.Book.BookSchema
  alias Laibrary.Page
  alias Laibrary.StreamSupervisor

  def get_book_for_view(book_id, liveview_pid \\ self()) do
    book = case get_book(book_id) do
      nil ->
        {:error, "Book not found"}

      book ->
        book
    end
    {:ok, first_page} = Page.get_first_page(book_id)

    book_details = %{
      book_id: book_id,
      shelf_id: book.shelf_id,
      first_page_id: first_page.id,
    }

    if book.title != nil and book.summary != nil do
      {:static, Map.put(book_details, :title, book.title) |> Map.put(:summary, book.summary)}
    else
      start_book_details_stream(book_id, liveview_pid)
      {:streaming, Map.put(book_details, :title, "") |> Map.put(:summary, "")}
    end
  end

  def start_book_details_stream(book_id, liveview_pid) do
    StreamSupervisor.start_book_details_worker(%{book_id: book_id, liveview_pid: liveview_pid})
  end

  def get_all_books_for_shelf(shelf_id) do
    Repo.all(from b in BookSchema, where: b.shelf_id == ^shelf_id, order_by: b.x)
  end

  def create_standard_book(shelf_id, x) do
    create(%{shelf_id: shelf_id, x: x})
  end

  defp create(attrs) do
    %BookSchema{}
    |> BookSchema.changeset(attrs)
    |> Repo.insert()
  end

  def get_book(book_id) do
    Repo.get(BookSchema, book_id)
  end

  def finalize_book(book_id, title, summary, outline) do
    book = Repo.get!(BookSchema, book_id)
    Repo.update(BookSchema.changeset(book, %{title: title, summary: summary, outline: outline}))
  end
end
