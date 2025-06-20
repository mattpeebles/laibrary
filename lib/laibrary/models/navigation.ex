defmodule Laibrary.Models.Breadcrumb do
  defstruct [
    :path,
    :label,
  ]
end

defmodule Laibrary.Models.Navigation do
  defstruct [
    :breadcrumbs,
  ]
end
