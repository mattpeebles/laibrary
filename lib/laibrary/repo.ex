defmodule Laibrary.Repo do
  use Ecto.Repo,
    otp_app: :laibrary,
    adapter: Ecto.Adapters.Postgres
end
