defmodule Laibrary.Book.BookSchema do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "books" do
    field :title, :string
    field :shelf_id, :binary_id
    field :x, :integer
    field :summary, :string

    timestamps()
  end

  def changeset(book, attrs) do
    book
    |> cast(attrs, [:title, :summary, :shelf_id, :x])
    |> validate_required([:shelf_id, :x])
  end
end
