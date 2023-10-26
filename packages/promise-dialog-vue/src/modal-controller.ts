export type DialogController = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  afterClose: () => void;
};

export type ModalControllerAdapter =
  | typeof antdModalAdvancedController
  | typeof antdController
  | typeof arcoDesignController
  | ((dialogController: DialogController) => Record<string, unknown>);

// 高版本的antd（antd>=5,antdv>=4）
export function antdModalAdvancedController(dialogController: DialogController) {
  const { visible, onOk, onCancel, afterClose } = dialogController;
  return {
    open: visible,
    onOk,
    onCancel,
    afterClose,
  };
}

export function antdController(dialogController: DialogController) {
  return dialogController;
}

export function arcoDesignController(dialogController: DialogController) {
  return dialogController;
}

export function elementPlusController(dialogController: DialogController) {
  const { visible, afterClose, onOk, onCancel } = dialogController;
  return {
    modelValue: visible,
    closed: afterClose,
    // elementPlus并没有自带确定取消按钮，需要自己实现，预留下面字段给开发者使用
    onOk,
    onCancel
  };
}

export function dialogController2ModalController(
  dialogController: DialogController,
  adapter: ModalControllerAdapter,
) {
  return adapter(dialogController);
}
