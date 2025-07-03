defmodule Laibrary.Repo.Migrations.AddOutlineToBooks do
  use Ecto.Migration

  def change do
    alter table(:books) do
      add :outline, :map
    end
  end
end
