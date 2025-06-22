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
      id: {:content_stream_worker, args.page_id},
      start: {Laibrary.Service.ContentStreamWorker, :start_link, [args]},
      restart: :temporary,
      type: :worker
    }

    IO.inspect(spec)

    DynamicSupervisor.start_child(__MODULE__, spec)
  end

  def start_book_details_worker(%{book_id: book_id, liveview_pid: pid} = args) do
    spec = %{
      id: {:book_details_worker, book_id},
      start: {Laibrary.Service.BookDetailsWorker, :start_link, [args]},
      restart: :temporary,
      type: :worker
    }

    IO.inspect("Book details worker spec")
    IO.inspect(spec)

    DynamicSupervisor.start_child(__MODULE__, spec)
  end
end
