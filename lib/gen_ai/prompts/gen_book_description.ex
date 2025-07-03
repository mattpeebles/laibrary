defmodule GenAi.Prompts.GenBookDescription do
  def get_prompt(title) do
    "A new book entitled '#{title}' has been added to the library. What is the description of the book?"
  end
end
