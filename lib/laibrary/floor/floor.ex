defmodule Laibrary.Floor do
  alias Laibrary.Floor.Models.Floor
  alias Laibrary.Models.Breadcrumb
  alias Laibrary.Models.Navigation
  import Ecto.Query, warn: false
  alias Laibrary.Repo
  alias Laibrary.Service.MockContent

  def get_floor(floor_id) do
    floor = Repo.get!(Floor, floor_id)

    breadcrumbs = [
      %Breadcrumb{path: "/library", label: "Library"},
      %Breadcrumb{path: "/floor/#{floor_id}", label: floor.name}
    ]

    # TODO: Get bookcases for floor

    {:ok, {floor, %Navigation{breadcrumbs: breadcrumbs}}}
  end

  defp generate_next_floor(library_id, current_floor_id \\ nil) do
    create_floor(%{
      library_id: library_id,
      name: MockContent.gibberish_sentence(1..3),
      shape: random_shape(),
      previous_floor_id: current_floor_id
    })
  end

  defp random_shape do
    ["square", "rectangle", "hexagon", "triangle"]
    |> Enum.random()
  end

  def create_floor(attrs \\ %{}) do
    %Floor{}
    |> Floor.changeset(attrs)
    |> Repo.insert()
  end

  def get_random_floor(library_id) do
    Repo.one(
      from f in Floor,
      where: f.library_id == ^library_id,
      order_by: fragment("RANDOM()"),
      limit: 1
    )
  end

  def get_or_create_random_floor(library_id) do
    case get_random_floor(library_id) do
      nil ->
        case generate_next_floor(library_id) do
          {:ok, floor} -> {:ok, floor}
          {:error, reason} -> raise "Failed to generate floor: #{inspect(reason)}"
        end

      floor -> {:ok, floor}
    end
  end
end
