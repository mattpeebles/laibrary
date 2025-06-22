defmodule Laibrary.Page do
  import Ecto.Query
  alias Laibrary.Repo
  alias Laibrary.Book.PageSchema

  def load_page_for_view(page_id, liveview_pid \\ self()) do
    page = case get_page(page_id) do
      nil ->
        {:error, "Page not found"}

      page -> page
    end

    public_url = get_public_url(page)

    page_info = %{
      book_id: page.book_id,
      page_id: page_id,
      next_page_id: page.next_page_id,
      page_number: page.page_number,
      previous_page_id: page.previous_page_id,
    }
    case public_url do
      nil ->
        start_streaming_content(page_id, liveview_pid)
        {:streaming, Map.put(page_info, :content, "")}

      _ ->
        case Req.get(public_url) do
          {:ok, %Req.Response{status: 200, body: body}} ->
            {:static, Map.put(page_info, :content, body)}

          {:error, _reason} ->
            {:error, Map.put(page_info, :content, "Unable to fetch page content")}
        end
    end



  end

  def finalize_page(page_id, s3_key, is_last_page \\ false) do
    case Repo.get(PageSchema, page_id) do
      nil ->
        {:error, "Current page not found"}

      current_page ->
        if not is_last_page and current_page.next_page_id == nil do
          {:ok, next_page} =
            create_page(%{
              book_id: current_page.book_id,
              # TODO: in the future, this doesn't need to be sequential
              page_number: current_page.page_number + 1,
              previous_page_id: page_id,
              next_page_id: nil,
              s3_key: nil,
            })

          update_page(current_page, %{next_page_id: next_page.id, s3_key: s3_key})
        else
          update_page(current_page, %{s3_key: s3_key})
        end
    end
  end

  defp create_page(attrs) do
    %PageSchema{}
    |> PageSchema.changeset(attrs)
    |> Repo.insert()
  end

  defp update_page(%PageSchema{} = page, attrs) do
    page
    |> PageSchema.changeset(attrs)
    |> Repo.update()
  end

  def get_first_page(book_id) do
    case Repo.one(
           from p in PageSchema,
             where: p.book_id == ^book_id and is_nil(p.previous_page_id),
             limit: 1
         ) do
      nil ->
        {:ok, first_page} =
          create_page(%{
            book_id: book_id,
            page_number: 1,
            previous_page_id: nil,
            next_page_id: nil,
            s3_key: nil
          })

        {:ok, first_page}

      first_page ->
        {:ok, first_page}
    end
  end

  def get_page(page_id) do
    Repo.get(PageSchema, page_id)
  end

  def start_streaming_content(page_id, liveview_pid \\ self()) do
    Laibrary.StreamSupervisor.start_stream_worker(%{
      page_id: page_id,
      liveview_pid: liveview_pid,
      prompt: ""
    })

    {:ok, :stream_started}
  end

  def get_public_url(%PageSchema{s3_key: s3_key}) when not is_nil(s3_key) do
    {:ok, url} = ExAws.S3.presigned_url(ExAws.Config.new(:s3), :get, "laibrarypages", s3_key, [])
    url
  end

  def get_public_url(_) do
    nil
  end
end
