import loading from "./loading.vue";
import { createApp } from "vue";

const LoadingPlugin = {};
let $vm;
const initInstance = () => {
    const app = createApp(loading);
    const container = document.createElement("div");
    $vm = app.mount(container);
    document.body.appendChild(container);
  };

LoadingPlugin.install = function (app) {
    const loading = {
        show(options) {
          if (!$vm) initInstance();
          options = Object.assign({}, {}, options);
          for (const i in options) {
            $vm[i] = options[i];
          }
          $vm.visible = true;
          return $vm;
        },
        hide() {
          if ($vm) $vm.visible = false;
        },
      };
      app.config.globalProperties.$loading = loading;
  //1、实例化并绑定组件
//   const plugin = createApp(loading);
//   const instance = plugin.mount(document.createElement("div"));

  //2.将挂载的Node添加到body中
//   document.body.appendChild(instance.$el);

  //3、定义全局
//   app.config.globalProperties.$confirm = instance;
};
export default LoadingPlugin;