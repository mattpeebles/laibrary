defmodule LaibraryWeb.Router do
  use LaibraryWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {LaibraryWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LaibraryWeb do
    pipe_through :browser

    live "/", Library.Index, :index
    live "/library", Library.Index, :index
    live "/room/:room_id", Library.Room, :room
    live "/bookcase/:bookcase_id", Library.Bookcase, :bookcase
    live "/shelf/:shelf_id", Library.Shelf, :shelf
    live "/book/:book_id", Book.Cover, :cover
    live "/book/:book_id/page/:page_id", Book.Page, :page
  end

  # Other scopes may use custom stacks.
  # scope "/api", LaibraryWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:laibrary, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: LaibraryWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
