defmodule Laibrary.Book do
  alias Laibrary.Book.Models.Book
  alias Laibrary.Models.Breadcrumb
  alias Laibrary.Models.Navigation

  def get_book(book_id) do
    breadcrumbs = [
      %Breadcrumb{path: "/library", label: "Library"},
      %Breadcrumb{path: "/floor/1", label: "Floor 1"},
      %Breadcrumb{path: "/bookcase/1", label: "Bookcase 1"},
      %Breadcrumb{path: "/shelf/1", label: "Shelf 1"},
      %Breadcrumb{path: "/book/1", label: "Book 1"},
    ]
    %Book{id: book_id, title: "Book #{book_id}", first_page_id: 1, navigation: %Navigation{breadcrumbs: breadcrumbs}}
  end
end
