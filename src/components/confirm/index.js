import { createApp } from "vue";
import ConfirmComponent from "./ConfirmModal.vue";

const ConfirmPlugin = {};
let $vm;

const defaultsOptions = {
  title: "提示",
  content: "内容",
  confirmText: "确定",
  cancelText: "取消",
  confirmColor: "#E20F2A",
  showCancelButton: true,
  showConfirmButton: true,
  clickMaskToClose: false,
};

const initInstance = () => {
  const app = createApp(ConfirmComponent);
  const container = document.createElement("div");
  $vm = app.mount(container);
  document.body.appendChild(container);
};

ConfirmPlugin.install = function (app) {
  const confirm = {
    show(options) {
      if (!$vm) initInstance();
      options = Object.assign({}, defaultsOptions, options);
      for (const i in options) {
        $vm[i] = options[i];
      }
      let handleCancel = $vm.handleCancel;
      let handleConfirm = $vm.handleConfirm;
      $vm.handleCancel = () => {
        handleCancel();
        options && options.onCancel && options.onCancel();
      };

      $vm.handleConfirm = () => {
        handleConfirm();
        options && options.onConfirm && options.onConfirm();
      };

      $vm.visible = true;

      return $vm;
    },
    hide() {
      if ($vm) $vm.visible = false;
    },
  };
  app.config.globalProperties.$confirm = confirm;
};

export default ConfirmPlugin;
