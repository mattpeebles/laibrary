defmodule Laibrary.Bookcase do
  alias Laibrary.Repo
  alias Laibrary.Bookcase.BookcaseSchema
  alias Laibrary.Shelf
  import Ecto.Query

  def get_bookcase_for_view(bookcase_id, liveview_pid) do
    bookcase = Repo.get!(BookcaseSchema, bookcase_id)
    shelves = Shelf.get_all_shelves_for_bookcase(bookcase_id)

    if length(shelves) == 0 do
      stream_shelves(bookcase, liveview_pid)
      {:streaming, {bookcase, shelves}}
    else
      {:static, {bookcase, shelves}}
    end
  end

  def render_bookcase(bookcase_id) do
    bookcase = Repo.get!(BookcaseSchema, bookcase_id)
    shelves = Shelf.get_all_shelves_for_bookcase(bookcase_id)
    {:ok, {bookcase, shelves}}
  end

  def stream_shelves(%BookcaseSchema{} = bookcase, liveview_pid) do
    Task.start(fn ->
      for y <- 0..5 do
        {:ok, shelf} = Shelf.create_standard_shelf(bookcase.id, y)
        send(liveview_pid, {:shelf_created, shelf})
      end
    end)
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
