import Config
import Dotenvy

# Load `.env` for all environments (dev, test, prod)

".env"
|> source()

# Start server in releases if PHX_SERVER is set
if System.get_env("PHX_SERVER") do
  config :laibrary, LaibraryWeb.Endpoint, server: true
end

# Always configure database and secrets from env
database_url =
  env!("DATABASE_URL") ||
    raise "environment variable DATABASE_URL is missing"

secret_key_base =
  env!("SECRET_KEY_BASE") ||
    raise "environment variable SECRET_KEY_BASE is missing"

config :laibrary, Laibrary.Repo,
  url: database_url,
  pool_size: String.to_integer(env!("POOL_SIZE") || "10"),
  stacktrace: config_env() == :dev,
  show_sensitive_data_on_connection_error: config_env() == :dev,
  prepare: :unnamed # needed for compatibility with supabase pgbouncer

config :laibrary, LaibraryWeb.Endpoint,
  secret_key_base: secret_key_base

config :ex_aws,
  http_client: ExAws.Request.Req,
  access_key_id: env!("AWS_ACCESS_KEY_ID"),
  secret_access_key: env!("AWS_SECRET_ACCESS_KEY"),
  region: "us-west-2"

config :openai_ex,
  api_key: env!("OPENAI_API_KEY"),
  organization_key: env!("OPENAI_ORGANIZATION_KEY")

# Optional: prod-specific endpoint config
if config_env() == :prod do
  host = env!("PHX_HOST") || "example.com"
  port = String.to_integer(env!("PORT") || "4000")

  config :laibrary, LaibraryWeb.Endpoint,
    url: [host: host, port: 443, scheme: "https"],
    http: [ip: {0, 0, 0, 0, 0, 0, 0, 0}, port: port]
end
