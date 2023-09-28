import "../node_modules/.pnpm/vue@3.3.4/node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { Dialog, DialogContext } from "./Dialog.js";
import { inject } from "../node_modules/.pnpm/@vue_runtime-core@3.3.4/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
function useDialog() {
  const currentDialog = inject(DialogContext);
  const dialog = Dialog.open;
  function onConfirm(...args) {
    currentDialog == null ? void 0 : currentDialog.onConfirm(...args);
  }
  function onCancel(...args) {
    currentDialog == null ? void 0 : currentDialog.onCancel(...args);
  }
  function confirm(...args) {
    currentDialog == null ? void 0 : currentDialog.confirm(...args);
  }
  function cancel(...args) {
    currentDialog == null ? void 0 : currentDialog.cancel(...args);
  }
  function getCurrentDialog() {
    return currentDialog;
  }
  return {
    dialog,
    onConfirm,
    confirm,
    onCancel,
    cancel,
    getCurrentDialog
  };
}
export {
  useDialog
};
