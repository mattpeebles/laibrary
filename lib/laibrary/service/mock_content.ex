defmodule Laibrary.Service.MockContent do
  defp generate_paragraphs() do
    for _ <- 1..Enum.random(5..15) do
      gibberish_sentence(2..10)
    end
  end

  def gibberish_name() do
    gibberish_sentence(1..3)
    |> String.split(" ")
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(" ")
  end

  def gibberish_sentence(word_count_range) do
    sentence =
      1..Enum.random(word_count_range)
      |> Enum.map(fn _ -> gibberish_word(~c"abcdefghijklmnopqrstuvwxyz") end)
      |> Enum.join(" ")

    String.capitalize(sentence) <> "."
  end

  defp gibberish_word(chars) do
    2..10
    |> Enum.random()
    |> then(fn length -> Enum.map(1..length, fn _ -> Enum.random(chars) end) end)
    |> to_string()
    |> String.trim()
  end

  def get_page_content(_page_id) do
    for _ <- 1..Enum.random(3..10) do
      generate_paragraphs()
    end
    |> Enum.join("\n\n\n")
  end
end
