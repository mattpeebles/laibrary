defmodule Laibrary.Repo.Migrations.AddFloorNumberToFloors do
  use Ecto.Migration

  def change do
    alter table(:floors) do
      add :floor_number, :bigserial, null: false
    end

    create unique_index(:floors, [:floor_number])
  end
end
