defmodule LaibraryWeb.BreadcrumbsComponent do
  use Phoenix.Component

  attr :breadcrumbs, :list, required: true

  def breadcrumbs(assigns) do
    ~H"""
    <nav class="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol class="list-reset flex">
        <%= for {crumb, idx} <- Enum.with_index(@breadcrumbs) do %>
          <li class="flex items-center">
            <.link href={crumb.path} class="hover:underline">
              <%= crumb.label %>
            </.link>
            <%= unless idx == length(@breadcrumbs) - 1 do %>
              <span class="mx-2">/</span>
            <% end %>
          </li>
        <% end %>
      </ol>
    </nav>
    """
  end
end
