defmodule Laibrary.StreamSupervisor do
  use DynamicSupervisor

  def start_link(_init_arg) do
    DynamicSupervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  @impl true
  def init(:ok) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def start_stream_worker(args) do
    spec = %{
      id: Laibrary.Service.ContentStreamWorker,
      start: {Laibrary.Service.ContentStreamWorker, :start_link, [args]},
      restart: :temporary,
      type: :worker
    }

    DynamicSupervisor.start_child(__MODULE__, spec)
  end
end
