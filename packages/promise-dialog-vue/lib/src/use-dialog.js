"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../node_modules/.pnpm/vue@3.3.4/node_modules/vue/dist/vue.runtime.esm-bundler.js");
const Dialog = require("./Dialog.js");
const runtimeCore_esmBundler = require("../node_modules/.pnpm/@vue_runtime-core@3.3.4/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js");
function useDialog() {
  const currentDialog = runtimeCore_esmBundler.inject(Dialog.DialogContext);
  const dialog = Dialog.Dialog.open;
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
exports.useDialog = useDialog;
