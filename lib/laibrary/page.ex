defmodule Laibrary.Page do
  alias Laibrary.Models.Page
  alias Laibrary.Service.MockContent

  def get_page(page_id) do
    page_id = String.to_integer(page_id)

    has_content = false

    %Page{
      id: page_id,
      number: page_id,
      content: if(has_content, do: MockContent.get_page_content(page_id), else: nil),
      previous_page_id: get_previous_page_id(page_id),
      next_page_id: get_next_page_id(page_id),
    }
  end

  def start_streaming_content(page_id, target_pid \\ self(), interval_ms \\ 100) do
    chunks = chunk_content(generate_content(page_id))
    Laibrary.Service.ContentServer.start_stream(chunks, interval_ms, target_pid)
  end

  defp chunk_content(content) do
    content
    |> String.split("\n")
    |> Enum.map(&(&1 <> "\n"))
  end

  defp generate_content(_page_id) do
    for _ <- 1..Enum.random(5..20), into: "", do: MockContent.gibberish_sentence(2..10) <> "\n"
  end

  def get_next_page_id(page_id) when page_id < 15, do: page_id + 1

  def get_next_page_id(_page_id), do: nil

  @spec get_previous_page_id(any()) :: nil | number()
  def get_previous_page_id(page_id) when page_id > 1, do: page_id - 1

  def get_previous_page_id(_page_id), do: nil
end
