import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { BookmarksState } from "./bookmarks";

const getters: GetterTree<BookmarksState, RootState> = {
  bookmarks(state): string[] {
    return state.bookmarks;
  },
};

export { getters };
