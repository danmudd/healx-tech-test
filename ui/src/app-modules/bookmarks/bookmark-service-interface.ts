interface IBookmarkService {
  getBookmarks(userId: string): Promise<IBookmarksResponse>;
  addBookmark(bookmark: IBookmarkPayload): Promise<void>;
  deleteBookmark(bookmark: IBookmarkPayload): Promise<void>;
}

interface IBookmarksResponse {
  bookmarks: string[];
}

interface IBookmarkPayload {
  userId: string;
  articleId: string;
}

interface IApiRequest {
  relativeUrl: string;
  payload?: any;
  params?: any;
}

export { IBookmarkService, IBookmarksResponse, IBookmarkPayload, IApiRequest };
