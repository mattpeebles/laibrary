defmodule Laibrary.Navigation.Breadcrumb do
  defstruct [
    :path,
    :label,
  ]
end

defmodule Laibrary.Navigation.Navigation do
  defstruct [
    :breadcrumbs,
  ]
end
