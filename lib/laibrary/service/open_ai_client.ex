
defmodule Laibrary.Service.OpenAI do
  @api_key Application.compile_env!(:openai_ex, :api_key)

  def auth_header, do: {"Authorization", "Bearer #{@api_key}"}

  defmodule Response do
    @base_url "https://api.openai.com/v1/responses"
    def create(
      prompt_id,
      prompt_version \\ nil,
      variables \\ %{},
      store \\ true
    ) do
      body = %{
        "prompt" => %{
          "id" => prompt_id,
          "version" => prompt_version,
          "variables" => variables
        },
        "store" => store
      }

      headers = [
        Laibrary.Service.OpenAI.auth_header(),
        {"Content-Type", "application/json"}
      ]

      case Req.post(url: @base_url, headers: headers, json: body) do
        {:ok, %{status: 200, body: %{"output" => [%{"content" => [%{"text" => json_str}]}]}}} ->
          case Jason.decode(json_str) do
            {:ok, decoded} -> {:ok, decoded}
            err -> err
          end
        {:ok, %{status: code, body: body}} ->
          {:error, {code, body}}

        {:error, reason} ->
          {:error, reason}
      end
    end
  end
end
