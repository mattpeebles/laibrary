defmodule Laibrary.Shelf do
  import Ecto.Query
  alias Laibrary.Repo
  alias Laibrary.Shelf.ShelfSchema
  alias Laibrary.Book

  def get_shelf(shelf_id, liveview_pid \\ self()) do
    shelf = Repo.get!(ShelfSchema, shelf_id)
    books = case Book.get_all_books_for_shelf(shelf_id) do
      [] ->
        Task.start(fn -> create_books(shelf_id, liveview_pid) end)
        []
      books ->
        books
    end
    {:ok, {shelf, books}}
  end

  defp create_books(shelf_id, liveview_pid) do
    for x <- 0..34 do
      {:ok, book} = Book.create_standard_book(shelf_id, x)
      if liveview_pid, do: send(liveview_pid, {:book_created, book})
    end
  end

  def get_all_shelves_for_bookcase(bookcase_id) do
    Repo.all(from s in ShelfSchema, where: s.bookcase_id == ^bookcase_id, order_by: s.y)
  end

  def create_standard_shelf(bookcase_id, y) do
    create(%{bookcase_id: bookcase_id, y: y})
  end

  defp create(attrs) do
    %ShelfSchema{}
    |> ShelfSchema.changeset(attrs)
    |> Repo.insert()
  end
end
