defmodule Laibrary.Repo.Migrations.CreateLibrarySchemaWithUuids do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\"")

    create table(:libraries, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :name, :string, null: false
      timestamps()
    end

    create table(:floors, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :name, :string, null: false
      add :shape, :string, null: false
      add :library_id, references(:libraries, type: :uuid, on_delete: :delete_all), null: false
      add :previous_floor_id, references(:floors, type: :uuid, on_delete: :delete_all)
      add :next_floor_id, references(:floors, type: :uuid, on_delete: :delete_all)
      timestamps()
    end

    create index(:floors, [:library_id])

    create table(:rooms, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :floor_id, references(:floors, type: :uuid, on_delete: :delete_all), null: false
      add :x, :integer, null: false
      add :y, :integer, null: false
      timestamps()
    end

    create index(:rooms, [:floor_id])
    create unique_index(:rooms, [:floor_id, :x, :y])

    create table(:bookcases, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :room_id, references(:rooms, type: :uuid, on_delete: :delete_all), null: false
      add :x, :integer, null: false
      add :y, :integer, null: false
      add :z, :integer, null: false
      timestamps()
    end

    create index(:bookcases, [:room_id])
    create unique_index(:bookcases, [:room_id, :x, :y, :z])

    create table(:shelves, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :bookcase_id, references(:bookcases, type: :uuid, on_delete: :delete_all), null: false
      add :y, :integer, null: false
      timestamps()
    end

    create index(:shelves, [:bookcase_id])
    create unique_index(:shelves, [:bookcase_id, :y])

    create table(:books, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :shelf_id, references(:shelves, type: :uuid, on_delete: :delete_all), null: false
      add :x, :integer, null: false
      add :title, :string
      add :summary, :text
      timestamps()
    end

    create index(:books, [:shelf_id])
    create unique_index(:books, [:shelf_id, :x])

    create table(:pages, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :book_id, references(:books, type: :uuid, on_delete: :delete_all), null: false
      add :page_number, :integer, null: false
      add :s3_key, :string
      timestamps()
    end

    create index(:pages, [:book_id])
    create unique_index(:pages, [:book_id, :page_number])
  end
end
