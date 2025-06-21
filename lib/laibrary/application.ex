defmodule Laibrary.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      LaibraryWeb.Telemetry,
      Laibrary.Repo,
      Laibrary.Runtime.MapGenerator,
      {DNSCluster, query: Application.get_env(:laibrary, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Laibrary.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Laibrary.Finch},
      # Start a worker by calling: Laibrary.Worker.start_link(arg)
      # {Laibrary.Worker, arg},
      # Start to serve requests, typically the last entry
      LaibraryWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Laibrary.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    LaibraryWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
