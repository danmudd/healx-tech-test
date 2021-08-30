import { IBookmarkService } from "@/app-modules/bookmarks/bookmark-service-interface";
import { RootState } from "@/store";
import { container } from "@/app-modules/ioc/inversify.config";
import { BookmarksState } from "./bookmarks";
import { SERVICE_IDENTIFIERS } from "@/app-modules/ioc/service-identifiers";
import { ActionTree } from "vuex";

let bookmarkService: IBookmarkService;

const actions: ActionTree<BookmarksState, RootState> = {
  async syncBookmarks({ commit, state }) {
    await getBookmarkService()
      .getBookmarks(state.userId)
      .then((res) => {
        commit("setBookmarks", res.bookmarks);
      });
  },
  setUserId({ commit }, userId) {
    commit("setUserId", userId);
  },
  async addBookmark({ commit, dispatch, state }, payload) {
    commit("addBookmark", payload);
    await getBookmarkService()
      .addBookmark({ userId: state.userId, articleId: payload })
      .finally(() => {
        dispatch("syncBookmarks");
      });
  },
  async deleteBookmark({ commit, dispatch, state }, payload) {
    commit("deleteBookmark", payload);
    await getBookmarkService()
      .deleteBookmark({ userId: state.userId, articleId: payload })
      .finally(() => {
        dispatch("syncBookmarks");
      });
  },
};

function getBookmarkService() {
  if (bookmarkService === undefined)
    bookmarkService = container.get(SERVICE_IDENTIFIERS.IBookmarkService);

  return bookmarkService;
}

export { actions };
