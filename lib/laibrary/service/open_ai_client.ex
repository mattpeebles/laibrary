defmodule Laibrary.Service.OpenAI do
  alias __MODULE__.EventParser
  require Logger

  def api_key, do: Application.get_env(:laibrary, :openai_api_key)

  def auth_header, do: {"Authorization", "Bearer #{api_key()}"}

  defmodule EventParser do
    @doc """
    Parses chunks from the event stream and dispatches messages to `target_pid`.
    Each line that begins with `event:` and `data:` is parsed and turned into a message.
    """
    def parse_chunk({:data, chunk}, target_pid) do
      # No need to split lines, just split the raw block by event groups
      chunk
      |> String.split("\n\n", trim: true)
      |> Enum.each(fn block ->
        parse_event_block(block, target_pid)
      end)
    end

    defp parse_event_block(block, target_pid) do
      # Do not split the block into lines — use regex to extract data cleanly
      event_type =
        Regex.run(~r/^event:\s*(.+)$/, block, capture: :all_but_first)
        |> case do
          [raw] ->
            raw
            |> String.trim()
            |> String.split(".")
            |> Enum.map(&String.to_atom/1)
            |> List.to_tuple()
            |> then(&{:ok, &1})

          _ -> :error
        end

      payload =
        Regex.run(~r/^data:\s*(\{.*\})$/s, block, capture: :all_but_first)
        |> case do
          [raw] -> Jason.decode(raw)
          _ -> :error
        end

      case {event_type, payload} do
        {{:ok, type}, {:ok, decoded}} ->
          send(target_pid, {type, decoded})

        _ ->
          IO.inspect(block, label: "NOOP: Unparsable OpenAI Block")
          :noop
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
          IO.inspect(chunk, label: "OpenAI Chunk")
          send(pid, {:openai_chunk, chunk})
          {:cont, acc}
        end
      )
    end
  end
end


defmodule SSEParser do
  defstruct buffer: "", target_pid: nil

  @doc """
  Feeds a raw SSE chunk into the parser, accumulating state and dispatching events.
  Returns a new parser state.
  """
  def feed(%SSEParser{buffer: buffer, target_pid: pid} = state, {:data, chunk}) do
    # Combine any previous buffered chunk with the new one
    combined = buffer <> chunk

    # Split only on full event blocks
    [complete_blocks, new_buffer] = split_complete_blocks(combined)

    Enum.each(complete_blocks, fn block ->
      parse_block(block, pid)
    end)

    %SSEParser{state | buffer: new_buffer}
  end

  # Helper to split completed blocks from remaining partial
  defp split_complete_blocks(str) do
    parts = String.split(str, "\n\n", trim: false)
    {complete, [last]} = Enum.split(parts, -1)
    [complete, last]
  end

  defp parse_block(block, pid) do
    lines = String.split(block, "\n", trim: true)

    with {:ok, event} <- extract_event(lines),
         {:ok, payload} <- extract_data(lines) do
      send(pid, {event, payload})
    else
      _ -> IO.inspect(block, label: "NOOP: Unparsable OpenAI Block")
    end
  end

  defp extract_event(lines) do
    case Enum.find(lines, &String.starts_with?(&1, "event:")) do
      "event:" <> raw ->
        raw
        |> String.trim()
        |> String.split(".")
        |> Enum.map(&String.to_atom/1)
        |> then(&{:ok, List.to_tuple(&1)})

      _ -> :error
    end
  end

  defp extract_data(lines) do
    case Enum.find(lines, &String.starts_with?(&1, "data:")) do
      "data:" <> raw ->
        raw
        |> String.trim()
        |> Jason.decode()

      _ -> :error
    end
  end
end
