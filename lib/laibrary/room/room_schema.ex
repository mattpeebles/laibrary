defmodule Laibrary.Room.RoomSchema do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "rooms" do
    field :floor_id, :binary_id
    field :x, :integer
    field :y, :integer
    field :name, :string
    field :shape, :string
    timestamps()
  end

  def changeset(room, attrs) do
    cast(room, attrs, [:floor_id, :x, :y, :name, :shape])
    |> validate_required([:floor_id, :x, :y, :name, :shape])
  end
end
