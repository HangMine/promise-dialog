"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const Dialog = require("./Dialog.js");
function useDialog() {
  const currentDialog = vue.inject(Dialog.DialogContext);
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
