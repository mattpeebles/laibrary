defmodule Laibrary.Floor.Models.Floor do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "floors" do
    field :name, :string
    field :shape, :string
    field :previous_floor_id, :binary_id
    field :next_floor_id, :binary_id
    field :library_id, :binary_id

    timestamps()
  end

  def changeset(floor, attrs) do
    cast(floor, attrs, [:name, :shape, :previous_floor_id, :next_floor_id, :library_id])
    |> validate_required([:name, :shape, :library_id])
  end
end
