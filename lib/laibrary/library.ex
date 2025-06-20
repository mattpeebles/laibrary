defmodule Laibrary.Library do
  alias Laibrary.Models.Book
  alias Laibrary.Models.Shelf
  alias Laibrary.Models.Floor

  def get_floor(floor_id) do
    floor_id = String.to_integer(floor_id)

    layouts = [
      %{shape: :square, shelf_count: 4},
      %{shape: :rectangle, shelf_count: 4},
      %{shape: :hexagon, shelf_count: 6},
      %{shape: :triangle, shelf_count: 3}
    ]

    %{shape: shape, shelf_count: shelf_count} = Enum.random(layouts)
    shelves = list_shelves(shelf_count)
    previous_floor_id = if floor_id == 1, do: nil, else: floor_id - 1
    next_floor_id = if floor_id == 12, do: nil, else: floor_id + 1

    %Floor{
      id: floor_id,
      shape: shape,
      shelves: shelves,
      previous_floor_id: previous_floor_id,
      next_floor_id: next_floor_id
    }
  end

  @spec list_floors() :: [%Floor{}]
  def list_floors() do
    for id <- 1..12 do
      previous_floor_id = if id == 1, do: nil, else: id - 1
      next_floor_id = if id == 12, do: nil, else: id + 1

      %Floor{
        id: id,
        shape: :none,
        shelves: [],
        previous_floor_id: previous_floor_id,
        next_floor_id: next_floor_id
      }
    end
  end

  defp list_shelves(shelf_count) do
    for id <- 1..shelf_count do
      %Shelf{id: id}
    end
  end

  def list_books(_shelf_id) do
    titles = [
      "The Infinite Shelf",
      "Notes from the Margins",
      "Whispers of Code",
      "Dreams in Static",
      "Fragments of Memory",
      "Reflections of a Machine"
    ]

    for id <- 1..12 do
      title = if(Enum.random(0..1) == 1, do: Enum.random(titles), else: nil)
      %Book{id: id, title: title}
    end
  end
end
