defmodule Laibrary.Book do
  alias Laibrary.Models.Book

  def get_book(book_id) do
    %Book{id: book_id, title: "Book #{book_id}", first_page_id: 1}
  end
end
