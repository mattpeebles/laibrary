defmodule Laibrary.Bookcase do
  alias Laibrary.Repo
  alias Laibrary.Bookcase.BookcaseSchema
  import Ecto.Query

  defp create(attrs) do
    %BookcaseSchema{}
    |> BookcaseSchema.changeset(attrs)
    |> Repo.insert()
  end

  def create_standard_bookcase(room_id, x, y) do
    create(%{
      room_id: room_id,
      x: x,
      y: y,
      z: 0
    })
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
