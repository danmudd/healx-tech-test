import { inject, injectable } from "inversify";
import {
  HttpMethod,
  IHttpRequest,
  IHttpService,
} from "../http/http-service-interface";
import { SERVICE_IDENTIFIERS } from "../ioc/service-identifiers";
import {
  IApiRequest,
  IBookmarkPayload,
  IBookmarkService,
  IBookmarksResponse,
} from "./bookmark-service-interface";

@injectable()
class BookmarkService implements IBookmarkService {
  constructor(
    @inject(SERVICE_IDENTIFIERS.IHttpService)
    private readonly httpService: IHttpService
  ) {}
  async addBookmark(bookmark: IBookmarkPayload): Promise<void> {
    const request = this.buildApiRequest({
      relativeUrl: "/bookmarks",
      payload: bookmark,
    });

    await this.httpService[HttpMethod.POST](request, request.headers);
  }

  async deleteBookmark(bookmark: IBookmarkPayload): Promise<void> {
    const request = this.buildApiRequest({
      relativeUrl: "/bookmarks",
      payload: bookmark,
    });

    await this.httpService[HttpMethod.DELETE](request, request.headers);
  }

  public async getBookmarks(userId: string): Promise<IBookmarksResponse> {
    const request = this.buildApiRequest({
      relativeUrl: "/bookmarks",
      params: {
        userId,
      },
    });

    console.log(request);

    const res = await this.httpService[HttpMethod.GET](
      request,
      request.headers
    );
    return res.data as IBookmarksResponse;
  }

  private buildApiRequest(
    request: IApiRequest
  ): IHttpRequest & { headers?: { [key: string]: string } } {
    return {
      baseUrl:
        "https://6ztu8769e9.execute-api.eu-west-1.amazonaws.com/dmudd/pubmed",
      url: request.relativeUrl,
      payload: request.payload,
      params: request.params,
      headers: {
        "x-api-key": "MOvkvkeskU3O1cODi7TUK57chXhHVXnn1wa9q1nd", // hate committing this...
      },
    };
  }
}

export { BookmarkService };
