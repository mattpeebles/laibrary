defmodule Laibrary.Repo.Migrations.FixRoomLinks do
  use Ecto.Migration

  def change do
    drop table(:room_links)

    create table(:room_links, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
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
