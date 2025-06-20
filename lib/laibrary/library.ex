defmodule Laibrary.Library do
  alias Laibrary.Floor
  alias Laibrary.Models.Library
  import Ecto.Query, warn: false
  alias Laibrary.Repo

  def get_library(_library_id \\ nil) do
    library = Repo.one(Library)
    {:ok, library}
  end

  def get_first_floor(library_id) do
    Floor.get_random_floor(library_id)
  end
end
