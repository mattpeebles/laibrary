defmodule Laibrary.Shelf.ShelfSchema do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "shelves" do
    field :bookcase_id, :binary_id
    field :y, :integer

    timestamps()
  end

  def changeset(shelf, attrs) do
    shelf
    |> cast(attrs, [:bookcase_id, :y])
    |> validate_required([:bookcase_id, :y])
  end
end
