import Vue from "vue";
import { PluginObject, VueConstructor } from "vue/types/umd";
import { container } from "@/app-modules/ioc/inversify.config";

class IoCPlugin implements PluginObject<any> {
  [key: string]: any;

  public install(vue: VueConstructor<Vue>): void {
    Object.defineProperty(vue.prototype, "$container", {
      get() {
        return container;
      },
    });
  }
}

export default {
  init() {
    Vue.use(new IoCPlugin());
  },
};
