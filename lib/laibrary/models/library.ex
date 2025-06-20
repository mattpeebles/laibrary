defmodule Laibrary.Models.Library do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @derive {Phoenix.Param, key: :id}

  schema "libraries" do
    field :name, :string
    timestamps()
  end

  def changeset(library, attrs) do
    library
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
