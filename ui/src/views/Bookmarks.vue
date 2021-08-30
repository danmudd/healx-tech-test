<template>
  <div>
    <v-navigation-drawer absolute permanent right>
      <template v-slot:prepend>
        <v-card-title>Bookmarked Articles</v-card-title>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="bookmark in bookmarks" :key="bookmark">
          <v-list-item-avatar>
            <v-icon>mdi-bookmark</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              ><a
                :href="`https://pubmed.ncbi.nlm.nih.gov/${bookmark}`"
                target="_blank"
                >{{ bookmark }}</a
              ></v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon @click="deleteBookmark(bookmark)"
              ><v-icon color="red">mdi-bookmark-off</v-icon></v-btn
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            solo
            label="Filter"
            single-line
            hide-details
            v-model="searchString"
            @keydown.enter="executeSearch"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn large color="primary" @click="executeSearch">Search </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="isSearching">
        <v-col cols="10">
          <v-skeleton-loader
            v-for="index in 3"
            :key="index"
            v-bind="attrs"
            type="article, actions"
            class="pa-2"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="articles">
        <v-card width="70vw">
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="articles"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:top
                ><h2 class="pa-2">
                  Results returned: {{ articleCount }}
                </h2></template
              >
              <template v-slot:item.uid="{ value }">
                <a
                  :href="`https://pubmed.ncbi.nlm.nih.gov/${value}`"
                  target="_blank"
                  >{{ value }}</a
                >
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small @click="bookmarkItem(item.uid)">
                  mdi-star
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { IBookmarkService } from "@/app-modules/bookmarks/bookmark-service-interface";
import { SERVICE_IDENTIFIERS } from "@/app-modules/ioc/service-identifiers";
import { IPubmedService } from "@/app-modules/pubmed/pubmed-service-interface";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Bookmarks extends Vue {
  private searchString = "";
  private isSearching = false;

  private articleCount = 0;
  private articles: any = null;

  private headers = [
    {
      text: "ID",
      value: "uid",
    },
    {
      text: "Title",
      value: "title",
    },
    {
      text: "Journal",
      value: "fulljournalname",
    },
    {
      text: "Author",
      value: "lastauthor",
    },
    {
      text: "Date",
      value: "epubdate",
    },
    {
      text: "Actions",
      value: "actions",
      sortable: false,
    },
  ];

  private get pubmedService(): IPubmedService {
    return this.$container.get(SERVICE_IDENTIFIERS.IPubmedService);
  }

  private get bookmarkService(): IBookmarkService {
    return this.$container.get(SERVICE_IDENTIFIERS.IBookmarkService);
  }

  private get bookmarks() {
    return this.$store.getters["bookmarks/bookmarks"];
  }

  private mounted() {
    this.$store.dispatch("bookmarks/syncBookmarks");
  }

  private async executeSearch() {
    this.isSearching = true;
    this.articleCount = 0;
    this.articles = null;
    const res = await this.pubmedService.searchArticles(this.searchString);

    this.articleCount = res.count;

    const res2 = await this.pubmedService.getArticles(res.idlist);

    const articles = res2.uids.map((uid: string) => res2[uid]);

    this.articles = articles;

    this.isSearching = false;
  }

  private bookmarkItem(articleId: string) {
    this.$store.dispatch("bookmarks/addBookmark", articleId);
  }
  private deleteBookmark(articleId: string) {
    this.$store.dispatch("bookmarks/deleteBookmark", articleId);
  }
}
</script>
