import Vue from "vue";
import Vuex from "vuex";
import { bookmarks } from "./modules/bookmarks/bookmarks";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export interface RootState {
  version: string;
}

export default new Vuex.Store<RootState>({
  modules: {
    bookmarks,
  },
  plugins: [createPersistedState({ paths: ["bookmarks.userId"] })],
});
