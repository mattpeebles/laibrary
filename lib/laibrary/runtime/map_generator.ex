defmodule Laibrary.Runtime.MapGenerator do
  use GenServer
  alias Laibrary.Floor
  alias Laibrary.Room
  alias Laibrary.RoomLink
  alias Laibrary.RoomLink.RoomLinkSchema

  ## Public API

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @doc """
  Ensures the library exists. Will create the first floor and the first room on it if it doesn't exist.
  """
  def ensure_library(library_id) do
    GenServer.call(__MODULE__, {:ensure_library, library_id})
  end

  @doc """
  Travel to the target room of the given room link. Ensures the target room exists.
  """
  def travel_to_target(room_link_id) do
    GenServer.call(__MODULE__, {:travel_to_target, room_link_id})
  end

  ## GenServer Callbacks

  @impl true
  def init(state) do
    {:ok, state}
  end

  @impl true
  def handle_call({:ensure_library, library_id}, _from, state) do
    case Floor.get_random_floor(library_id) do
      nil ->
        case Floor.create_floor_for_library(library_id) do
          {:ok, floor} ->
            {:ok, room} = Room.create_first_room_for_floor(floor.id)
            {:reply, {:ok, room}, state}
        end

      floor ->
        case Room.get_first_room_for_floor(floor.id) do
          nil ->
            {:ok, room} = Room.create_first_room_for_floor(floor.id)
            {:reply, {:ok, room}, state}

          room ->
            {:reply, {:ok, room}, state}
        end
    end
  end

  @impl true
  def handle_call({:travel_to_target, room_link_id}, _from, state) do
    case RoomLink.get(room_link_id) do
      nil ->
        {:reply, {:error, "Room link not found"}, state}

      %RoomLinkSchema{
        target_room_id: nil
      } = room_link ->
        case create_room_and_link(room_link) do
          {:ok, target_room} ->
            {:reply, {:ok, target_room}, state}

          {:error, reason} ->
            {:reply, {:error, reason}, state}
        end

      %RoomLinkSchema{target_room_id: target_room_id} ->
        {:reply, {:ok, Room.get(target_room_id)}, state}
    end
  end



  ## Internal

  defp create_room_and_link(%RoomLinkSchema{target_room_id: nil} = original_room_link) do
    %RoomLinkSchema{
      source_room_id: source_room_id,
      direction: direction,
      link_type: link_type
    } = original_room_link

    case link_type do
      "stairs" ->
        {:ok, floor} = maybe_create_floor_below(source_room_id, link_type)
        {:ok, new_room} = Room.create_first_room_for_floor(floor.id)

        # update existing links
        {:ok, _link} = RoomLink.update(original_room_link, %{target_room_id: new_room.id})
        {:ok, _reverse_link} = RoomLink.create(%{
          source_room_id: new_room.id,
          target_room_id: source_room_id,
          direction: reverse_direction(direction),
          link_type: link_type
        })

        {:ok, new_room}

      _ ->
        {:error, "Unsupported link type: #{link_type}"}
    end

  end

  defp maybe_create_floor_below(source_room_id, "stairs") do
    Room.get!(source_room_id).floor_id
    |> Floor.get!()
    |> Map.get(:library_id)
    |> Floor.create_floor_for_library()
    |> case do
      {:ok, floor} ->
        {:ok, floor}

      {:error, reason} ->
        {:error, reason}
    end
  end
  defp maybe_create_floor_below(source_room_id, _), do: Room.get!(source_room_id).floor_id

  defp reverse_direction("north"), do: "south"
  defp reverse_direction("south"), do: "north"
  defp reverse_direction("east"), do: "west"
  defp reverse_direction("west"), do: "east"
  defp reverse_direction("up"), do: "down"
  defp reverse_direction("down"), do: "up"
end
