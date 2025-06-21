defmodule Laibrary.Book.PageSchema do
  use Ecto.Schema
  import Ecto.Changeset
  alias ExAws.S3

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "pages" do
    field :book_id, :binary_id
    field :page_number, :integer
    field :previous_page_id, :binary_id
    field :next_page_id, :binary_id
    field :s3_key, :string

    timestamps()
  end

  def changeset(page, attrs) do
    page
    |> cast(attrs, [:book_id, :page_number, :previous_page_id, :next_page_id, :s3_key])
    |> validate_required([:book_id, :page_number])
  end
end
