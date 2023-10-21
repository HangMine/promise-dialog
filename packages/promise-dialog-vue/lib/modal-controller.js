"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function antdModalAdvancedController(dialogController) {
  const { visible, onOk, onCancel, afterClose } = dialogController;
  return {
    open: visible,
    onOk,
    onCancel,
    afterClose
  };
}
function antdController(dialogController) {
  return dialogController;
}
function arcoDesignController(dialogController) {
  return dialogController;
}
function dialogController2ModalController(dialogController, adapter) {
  return adapter(dialogController);
}
exports.antdController = antdController;
exports.antdModalAdvancedController = antdModalAdvancedController;
exports.arcoDesignController = arcoDesignController;
exports.dialogController2ModalController = dialogController2ModalController;
