defmodule Laibrary.Repo.Migrations.UpdateFloorAndRoom do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      add :shape, :string, null: false
      add :name, :string, null: false
    end

    alter table(:floors) do
      remove :previous_floor_id
      remove :next_floor_id
      remove :shape
    end

    create table(:room_links) do
      add :source_room_id, references(:rooms, type: :uuid, on_delete: :delete_all), null: false
      add :target_room_id, references(:rooms, type: :uuid, on_delete: :nilify_all)
      add :link_type, :string, null: false
      add :direction, :string, null: false
      timestamps()
    end

    create index(:room_links, [:source_room_id])
    create unique_index(:room_links, [:source_room_id, :direction])
  end
end
