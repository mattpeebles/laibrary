defmodule Laibrary.Service.OpenAI do
  alias __MODULE__.EventParser

  def api_key, do: Application.get_env(:laibrary, :openai_api_key)

  def auth_header, do: {"Authorization", "Bearer #{api_key()}"}

  defmodule EventParser do
    @doc """
    Parses chunks from the event stream and dispatches messages to `target_pid`.
    Each line that begins with `event:` and `data:` is parsed and turned into a message.
    """
    def parse_chunk({:data, chunk}, target_pid) do
      chunk
      |> String.split("\n\n", trim: true)
      |> Enum.each(fn block ->
        parse_event_block(block, target_pid)
      end)
    end

    defp parse_event_block(block, target_pid) do
      lines = String.split(block, "\n")

      with {:ok, event_type} <- extract_event_type(lines),
           {:ok, payload} <- extract_data(lines) do
        send(target_pid, {event_type, payload})
      else
        _ -> :noop
      end
    end

    defp extract_event_type(lines) do
      case Enum.find(lines, &String.starts_with?(&1, "event:")) do
        "event:" <> raw ->
          raw
          |> String.trim()
          |> String.split(".")
          |> Enum.map(&String.to_atom/1)
          |> then(&{:ok, List.to_tuple(&1)})

        _ ->
          :error
      end
    end

    defp extract_data(lines) do
      case Enum.find(lines, &String.starts_with?(&1, "data:")) do
        "data:" <> raw ->
          raw
          |> String.trim()
          |> Jason.decode()

        _ ->
          :error
      end
    end
  end

  defmodule Response do
    @base_url "https://api.openai.com/v1/responses"
    def create(
      prompt_id,
      prompt_version \\ nil,
      variables \\ %{},
      store \\ true,
      timeout_ms \\ 1_500
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

      case Req.post(url: @base_url, headers: headers, json: body, receive_timeout: timeout_ms) do
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

    def stream(
      pid,
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
        "store" => store,
        "stream" => true
      }

      headers = [
        Laibrary.Service.OpenAI.auth_header(),
        {"Content-Type", "application/json"},
        {"Accept", "text/event-stream"}
      ]

      Req.post(
        url: @base_url,
        headers: headers,
        json: body,
        into: fn chunk, acc ->
          EventParser.parse_chunk(chunk, pid)
          {:cont, acc}
        end
      )
    end
  end
end
