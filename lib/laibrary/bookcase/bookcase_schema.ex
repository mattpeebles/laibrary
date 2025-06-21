defmodule Laibrary.Bookcase.BookcaseSchema do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "bookcases" do
    field :room_id, :binary_id
    field :x, :integer
    field :y, :integer
    field :z, :integer

    timestamps()
  end

  def changeset(bookcase, attrs) do
    bookcase
    |> cast(attrs, [:room_id, :x, :y, :z])
    |> validate_required([:room_id, :x, :y, :z])
  end
end
