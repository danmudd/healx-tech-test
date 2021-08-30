import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ioc from "./plugins/ioc";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

ioc.init();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
