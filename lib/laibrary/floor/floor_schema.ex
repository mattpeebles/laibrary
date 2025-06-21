defmodule Laibrary.Floor.FloorSchema do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "floors" do
    field :name, :string
    field :library_id, :binary_id

    timestamps()
  end

  def changeset(floor, attrs) do
    cast(floor, attrs, [:name, :library_id])
    |> validate_required([:name, :library_id])
  end
end
