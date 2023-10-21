"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const react = require("react");
const Dialog = require("./Dialog.js");
function useDialog() {
  const currentDialog = react.useContext(Dialog.DialogContext);
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
  async function confirmDialog() {
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
    confirmDialog,
    getCurrentDialog
  };
}
exports.useDialog = useDialog;
