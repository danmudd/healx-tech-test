import { MutationTree } from "vuex";
import { BookmarksState } from "./bookmarks";

const mutations: MutationTree<BookmarksState> = {
  setBookmarks(state, payload: string[]) {
    state.bookmarks = payload;
  },
  setUserId(state, payload: string) {
    state.userId = payload;
  },
  addBookmark(state, payload: string) {
    state.bookmarks.push(payload);
  },
  deleteBookmark(state, payload: string) {
    const i = state.bookmarks.indexOf(payload);
    if (i !== -1) state.bookmarks.splice(i, 1);
  },
};

export { mutations };
