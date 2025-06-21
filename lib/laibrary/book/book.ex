defmodule Laibrary.Book do
  import Ecto.Query
  alias Laibrary.Repo
  alias Laibrary.Book.BookSchema
  alias Laibrary.Page

  def get_all_books_for_shelf(shelf_id) do
    Repo.all(from b in BookSchema, where: b.shelf_id == ^shelf_id)
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
end
