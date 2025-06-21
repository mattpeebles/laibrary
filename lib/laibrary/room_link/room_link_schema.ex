defmodule Laibrary.RoomLink.RoomLinkSchema do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "room_links" do
    field :source_room_id, :binary_id
    field :target_room_id, :binary_id
    field :link_type, :string
    field :direction, :string
    timestamps()
  end

  def changeset(room_link, attrs) do
    cast(room_link, attrs, [:source_room_id, :target_room_id, :link_type, :direction])
    |> validate_required([:source_room_id, :link_type, :direction])
  end
end
