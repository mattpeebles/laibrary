defmodule Laibrary.Floor do
  alias Laibrary.Floor.FloorSchema
  alias Laibrary.Navigation.Breadcrumb
  alias Laibrary.Navigation.Navigation
  import Ecto.Query, warn: false
  alias Laibrary.Repo
  alias Laibrary.Service.MockContent
  alias Library.Room

  def get(floor_id) do
    Repo.get(FloorSchema, floor_id)
  end

  def get!(floor_id) do
    Repo.get!(FloorSchema, floor_id)
  end

  defp generate_next_floor(library_id) do
    create_floor(%{
      library_id: library_id,
      name: MockContent.gibberish_sentence(1..3),
    })
  end

  def create_floor(attrs \\ %{}) do
    %FloorSchema{}
    |> FloorSchema.changeset(attrs)
    |> Repo.insert()
  end

  def create_floor_for_library(library_id) do
    case generate_next_floor(library_id) do
      {:ok, floor} -> {:ok, floor}
      {:error, reason} -> raise "Failed to generate floor: #{inspect(reason)}"
    end
  end

  def get_random_floor(library_id) do
    Repo.one(
      from f in FloorSchema,
      where: f.library_id == ^library_id,
      order_by: fragment("RANDOM()"),
      limit: 1
    )
  end
end
