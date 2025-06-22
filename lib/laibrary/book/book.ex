defmodule Laibrary.Book do
  import Ecto.Query
  alias Laibrary.Repo
  alias Laibrary.Book.BookSchema
  alias Laibrary.Page

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
    book = Repo.get!(BookSchema, book_id)
    {:ok, first_page} = Page.get_first_page(book_id)

    {:ok, {book, first_page}}
  end

  def finalize_book(book_id, title, summary) do
    book = Repo.get!(BookSchema, book_id)
    Repo.update(BookSchema.changeset(book, %{title: title, summary: summary}))
  end

  def generate_cover(book_id, liveview_id \\ self()) do
    IO.inspect("Starting book details worker")
    Laibrary.StreamSupervisor.start_book_details_worker(%{book_id: book_id, liveview_pid: liveview_id})
    IO.inspect("Book details worker started")
    {:ok, :stream_started}
  end
end
