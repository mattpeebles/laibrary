defmodule Laibrary.Bookcase do
  alias Laibrary.Repo
  alias Laibrary.Bookcase.BookcaseSchema
  alias Laibrary.Shelf
  import Ecto.Query

  def render_bookcase(bookcase_id) do
    bookcase = Repo.get!(BookcaseSchema, bookcase_id)
    shelves = Shelf.get_all_shelves_for_bookcase(bookcase_id)
    {:ok, {bookcase, shelves}}
  end

  defp create(attrs) do
    %BookcaseSchema{}
    |> BookcaseSchema.changeset(attrs)
    |> Repo.insert()
  end

  def create_standard_bookcase(room_id, x, y) do
    {:ok, bookcase} = create(%{
      room_id: room_id,
      x: x,
      y: y,
      z: 0
    })

    # TODO: let's defer this until the user enters the bookcase
    {:ok, _shelves} = Shelf.create_standard_shelves(bookcase.id)

    {:ok, bookcase}
  end

  def get_all_bookcases_for_room(room_id) do
    Repo.all(
      from b in BookcaseSchema,
        where: b.room_id == ^room_id,
        order_by: b.x,
        order_by: b.y
    )
  end
end
