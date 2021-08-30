<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title
        class="text-no-wrap"
        @click="$router.push('/')"
        style="cursor: pointer"
        >PubMed!</v-toolbar-title
      >

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
