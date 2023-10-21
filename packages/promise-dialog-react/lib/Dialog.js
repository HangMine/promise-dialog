"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const react = require("react");
const modalController = require("./modal-controller.js");
const useDialogReducer = require("./use-dialog-reducer.js");
const _Dialog = class _Dialog {
  constructor() {
    // 弹窗控制器
    __publicField(this, "dialogController", null);
    // 弹窗promise，用于控制异步流程
    __publicField(this, "dialogPromise", {});
    // 自定义的confirm(外部会直接调用，通过箭头函数保证this指向)
    __publicField(this, "confirm", (resolveResult) => {
      var _a, _b, _c;
      (_b = (_a = this.dialogPromise).resolve) == null ? void 0 : _b.call(_a, resolveResult);
      (_c = this.hide) == null ? void 0 : _c.call(this);
    });
    // 自定义的cancel(外部会直接调用，通过箭头函数保证this指向)
    __publicField(this, "cancel", (resolveResult) => {
      var _a, _b, _c;
      (_b = (_a = this.dialogPromise).reject) == null ? void 0 : _b.call(_a, resolveResult);
      (_c = this.hide) == null ? void 0 : _c.call(this);
    });
  }
  // 在使用之前需要先安装
  static install(options) {
    const {
      modalControllerAdapter
    } = options;
    _Dialog._ModalComponent = options.ModalComponent;
    if (modalControllerAdapter) {
      _Dialog.modalControllerAdapter = modalControllerAdapter;
    }
  }
  // UI库的Modal组件
  static get ModalComponent() {
    if (!_Dialog._ModalComponent)
      throw new Error("请先调用Dialog.install");
    return _Dialog._ModalComponent;
  }
  // 在provide后保存dispatch，通过dispatch来操作dialog
  // 带有dialog上下文的组件FC
  get ComponentWithDialogContext() {
    if (!this._ComponentWithDialogContext)
      throw new Error("ComponentWithDialogContext未初始化");
    return this._ComponentWithDialogContext;
  }
  // 创建并弹出(业务用的是该函数)
  static open(ReactNodeOrComponent, componentPropsOrModalProps, modalProps = {}) {
    const dialogInstance = new _Dialog();
    dialogInstance.create(ReactNodeOrComponent, componentPropsOrModalProps, modalProps);
    return dialogInstance.show();
  }
  // 清除所有的dialog
  static clearDialogs() {
    _Dialog.dialogDispatch(useDialogReducer.dialogActions.clearDialogs());
  }
  // 判断是否是ReactNode，不够严谨，但应该满足业务需要
  static isReactNode(value) {
    return react.isValidElement(value);
  }
  // 自带footer的确认回调
  // 自带footer的取消回调
  // 创建Dialog
  create(ReactNodeOrComponent, componentPropsOrModalProps, modalProps = {}) {
    if (_Dialog.isReactNode(ReactNodeOrComponent)) {
      this.createByReactNode(ReactNodeOrComponent, componentPropsOrModalProps);
    } else {
      this.createByComponent(ReactNodeOrComponent, componentPropsOrModalProps, modalProps);
    }
    _Dialog.dialogDispatch(useDialogReducer.dialogActions.pushDialog(this));
  }
  // 通过ReactNode创建Dialog
  createByReactNode(reactNode, modalProps = {}) {
    this.createByComponent(() => vue.createVNode(vue.Fragment, null, [reactNode]), {}, modalProps);
  }
  // 通过组件创建Dialog
  createByComponent(Component, componentProps, modalProps = {}) {
    const {
      dialogify
    } = Component;
    const ComponentWithContext = withDialogContext(() => {
      const appContext = react.useContext(DialogAppContext);
      const visible = (appContext == null ? void 0 : appContext.showDialogs.includes(this)) || false;
      const onOk = async () => {
        var _a;
        await ((_a = this.onConfirmCallback) == null ? void 0 : _a.call(this, this));
        this.hide();
      };
      const onCancel = async () => {
        var _a;
        await ((_a = this.onCancelCallback) == null ? void 0 : _a.call(this, this));
        this.hide();
      };
      const afterClose = async () => {
        _Dialog.dialogDispatch(useDialogReducer.dialogActions.popDialog(this));
      };
      this.dialogController = {
        visible,
        onOk,
        onCancel,
        afterClose
      };
      const modalController$1 = modalController.dialogController2ModalController(this.dialogController, _Dialog.modalControllerAdapter);
      const computedModalProps = {
        ...modalController$1,
        ...dialogify,
        // 优先级低于modalProps
        ...modalProps
      };
      return vue.createVNode(_Dialog.ModalComponent, computedModalProps, {
        default: () => [vue.createVNode(Component, componentProps, null)]
      });
    }, this);
    this._ComponentWithDialogContext = ComponentWithContext;
  }
  // 弹出Dialog
  async show() {
    return new Promise((resolve, reject) => {
      this.dialogPromise.resolve = resolve;
      this.dialogPromise.reject = reject;
      _Dialog.dialogDispatch(useDialogReducer.dialogActions.showDialog(this));
    });
  }
  // 隐藏Dialog
  hide() {
    _Dialog.dialogDispatch(useDialogReducer.dialogActions.hideDialog(this));
  }
  // 自带footer的确认
  onConfirm(callback) {
    this.onConfirmCallback = callback;
  }
  // 自带footer的取消
  onCancel(callback) {
    this.onCancelCallback = callback;
  }
};
// ModalController适配器
__publicField(_Dialog, "modalControllerAdapter", modalController.antdModalAdvancedController);
let Dialog = _Dialog;
const DialogContext = react.createContext(null);
function withDialogContext(WrappedComponent, dialog) {
  const ComponentWithDialog = (props) => {
    return vue.createVNode(DialogContext.Provider, {
      "value": dialog
    }, {
      default: () => [vue.createVNode(WrappedComponent, props, null)]
    });
  };
  ComponentWithDialog.displayName = `withDialogContext(${WrappedComponent.displayName})`;
  return ComponentWithDialog;
}
const DialogAppContext = react.createContext(null);
function DialogProvider(props) {
  const {
    children,
    ModalComponent,
    modalControllerAdapter
  } = props;
  const [store, dispatch] = useDialogReducer.useDialogReducer();
  react.useEffect(() => {
    Dialog.install({
      ModalComponent,
      modalControllerAdapter
    });
    Dialog.dialogDispatch = dispatch;
  }, [dispatch, ModalComponent, modalControllerAdapter]);
  return vue.createVNode(DialogAppContext.Provider, {
    "value": store
  }, {
    default: () => [children, store.dialogs.map((dialog, i) => {
      const {
        ComponentWithDialogContext
      } = dialog;
      return vue.createVNode(ComponentWithDialogContext, {
        "key": i
      }, null);
    })]
  });
}
exports.Dialog = Dialog;
exports.DialogContext = DialogContext;
exports.DialogProvider = DialogProvider;
