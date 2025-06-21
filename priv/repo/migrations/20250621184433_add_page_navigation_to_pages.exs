defmodule Laibrary.Repo.Migrations.AddPageNavigationToPages do
  use Ecto.Migration

  def change do
    alter table(:pages) do
      add :previous_page_id, references(:pages, type: :uuid, on_delete: :nilify_all)
      add :next_page_id, references(:pages, type: :uuid, on_delete: :nilify_all)
    end
  end
end
