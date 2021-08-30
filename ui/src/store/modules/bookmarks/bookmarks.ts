import { RootState } from "@/store";
import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export interface BookmarksState {
  userId: string;
  bookmarks: string[];
}

const state: BookmarksState = {
  userId: "",
  bookmarks: [],
};

const bookmarks: Module<BookmarksState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export { bookmarks };
