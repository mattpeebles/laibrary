defmodule Laibrary.Bookcase.Bookcase do
  alias Laibrary.Bookcase.Models.Bookcase
  alias Laibrary.Models.Breadcrumb
  alias Laibrary.Models.Navigation
  alias Laibrary.Bookcase.Models.Shelf

  def get_bookcase(bookcase_id) do
    bookcase_id = String.to_integer(bookcase_id)
    shelves = list_shelves(bookcase_id)
    breadcrumbs = [
      %Breadcrumb{path: "/library", label: "Library"},
      %Breadcrumb{path: "/floor/1", label: "Floor 1"},
      %Breadcrumb{path: "/bookcase/1", label: "Bookcase 1"},
    ]
    %Bookcase{
      id: bookcase_id,
      shelves: shelves,
      navigation: %Navigation{breadcrumbs: breadcrumbs}
    }
  end

  defp list_shelves(shelf_count) do
    for id <- 1..shelf_count do
      %Shelf{id: id}
    end
  end
end
