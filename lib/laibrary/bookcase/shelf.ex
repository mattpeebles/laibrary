defmodule Laibrary.Bookcase.Shelf do
  alias Laibrary.Bookcase.Models.Shelf
  alias Laibrary.Models.Breadcrumb
  alias Laibrary.Models.Navigation
  alias Laibrary.Book.Models.Book

  def get_shelf(shelf_id) do
    shelf_id = String.to_integer(shelf_id)
    books = list_books(shelf_id)
    breadcrumbs = [
      %Breadcrumb{path: "/library", label: "Library"},
      %Breadcrumb{path: "/floor/1", label: "Floor 1"},
      %Breadcrumb{path: "/bookcase/1", label: "Bookcase 1"},
      %Breadcrumb{path: "/shelf/1", label: "Shelf 1"},
    ]

    %Shelf{id: shelf_id, books: books, navigation: %Navigation{breadcrumbs: breadcrumbs}}
  end

  def list_books(_shelf_id) do
    titles = [
      "The Infinite Shelf",
      "Notes from the Margins",
      "Whispers of Code",
      "Dreams in Static",
      "Fragments of Memory",
      "Reflections of a Machine"
    ]

    for id <- 1..12 do
      title = if(Enum.random(0..1) == 1, do: Enum.random(titles), else: nil)
      %Book{id: id, title: title}
    end
  end
end
