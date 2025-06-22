defmodule Laibrary.Room do
  import Ecto.Query, warn: false
  alias Laibrary.Room.RoomSchema
  alias Laibrary.Repo
  alias Laibrary.Service.MockContent
  alias Laibrary.Bookcase
  alias Laibrary.RoomLink

  def get_room_for_view(room_id, liveview_pid) do
    room = get!(room_id)
    bookcases = Bookcase.get_all_bookcases_for_room(room_id)
    room_links = RoomLink.get_all_room_links_for_room(room_id)

    room_details = %{
      room_id: room.id,
      name: room.name,
      bookcases: bookcases,
      room_links: room_links
    }

    case length(bookcases) do
      0 ->
        stream_bookcases(room, liveview_pid)
        {:streaming, room_details}

      _ ->
        {:static, room_details}
    end
  end

  def get!(room_id) do
    Repo.get!(RoomSchema, room_id)
  end

  defp create_room(attrs) do
    %RoomSchema{}
    |> RoomSchema.changeset(attrs)
    |> Repo.insert()
  end

  def create_for_floor(floor_id, x, y) do
    # TODO: ensure there's no collision with other rooms, otherwise raise an error

    shape = random_shape()
    name = MockContent.gibberish_name()

    create_room(%{
      floor_id: floor_id,
      x: x,
      y: y,
      shape: shape,
      name: name
    })
  end

  def stream_bookcases(%RoomSchema{} = room, liveview_pid) do
    Task.start(fn ->
      bookcase_positions = %{
        "square" => [{0, 0}, {1, 0}, {0, 1}, {1, 1}],
        "rectangle" => [{0, 0}, {1, 0}, {0, 1}, {1, 1}],
        "triangle" => [{0, 0}, {1, 0}, {1, 1}],
        "hexagon" => [{0, 1}, {1, 0}, {0, -1}, {-1, 0}, {-1, 1}, {1, -1}]
      }

      bookcase_positions
      |> Map.get(room.shape)
      |> Enum.each(fn {x, y} ->
        {:ok, bookcase} = Bookcase.create_standard_bookcase(room.id, x, y)
        send(liveview_pid, {:bookcase_created, bookcase})
      end)
    end)
  end

  def create_first_room_for_floor(floor_id) do
    {:ok, room} = create_for_floor(floor_id, 0, 0)

    # currently we'll only have one room per floor, so let's just add stairs to it immediately
    # in the future, we'll have multiple rooms per floor, so we'll be adding doors to the other rooms
    # we'll need to be careful when creating stairs to other rooms to ensure we don't create a loop
    {:ok, _link} = RoomLink.create_stairs(room.id, "down")
    {:ok, room}
  end

  def get_first_room_for_floor(floor_id) do
    Repo.one(from r in RoomSchema, where: r.floor_id == ^floor_id, limit: 1)
  end

  defp random_shape() do
    ["square", "rectangle", "hexagon", "triangle"]
    |> Enum.random()
  end
end
