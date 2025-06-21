defmodule Laibrary.RoomLink do
  import Ecto.Query, warn: false
  alias Laibrary.Repo
  alias Laibrary.RoomLink.RoomLinkSchema

  def get(room_link_id) do
    Repo.get(RoomLinkSchema, room_link_id)
  end

  def get!(room_link_id) do
    Repo.get!(RoomLinkSchema, room_link_id)
  end

  def update(%RoomLinkSchema{} = room_link, attrs) do
    room_link
    |> RoomLinkSchema.changeset(attrs)
    |> Repo.update()
  end

  def create(attrs) do
    %RoomLinkSchema{}
    |> RoomLinkSchema.changeset(attrs)
    |> Repo.insert()
  end

  def create_stairs(source_room_id, direction) do
    create(%{
      source_room_id: source_room_id,
      target_room_id: nil,
      direction: direction,
      link_type: "stairs"
    })
  end

  def get_by_source_and_direction(source_room_id, direction) do
    Repo.one(
      from rl in RoomLinkSchema,
        where: rl.source_room_id == ^source_room_id and rl.direction == ^direction,
        limit: 1
    )
  end

  def get_all_room_links_for_room(room_id) do
    Repo.all(
      from rl in RoomLinkSchema,
        where: rl.source_room_id == ^room_id
    )
  end
end
