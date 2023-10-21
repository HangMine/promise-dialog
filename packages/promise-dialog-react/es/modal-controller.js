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
export {
  antdController,
  antdModalAdvancedController,
  arcoDesignController,
  dialogController2ModalController
};
