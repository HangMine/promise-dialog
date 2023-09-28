var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import "../node_modules/.pnpm/vue@3.3.4/node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { antdModalAdvancedController, dialogController2ModalController } from "./modal-controller.js";
import { dialogActions, useDialogReducer } from "./use-dialog-reducer.js";
import { isVNode, defineComponent, createVNode, Fragment, inject, provide, onMounted } from "../node_modules/.pnpm/@vue_runtime-core@3.3.4/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
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
  // 在使用之前需要先安装（在DialogProvider已经安装）
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
  // 创建并弹出
  static open(ComponentOrVnode, ComponentPropsOrModalProps, modalProps) {
    const dialogInstance = new _Dialog();
    dialogInstance.create(ComponentOrVnode, ComponentPropsOrModalProps, modalProps);
    return dialogInstance.show();
  }
  // 清除所有的dialog
  static clearDialogs() {
    _Dialog.dialogDispatch(dialogActions.clearDialogs());
  }
  // 自带footer的确认回调
  // 自带footer的取消回调
  // 创建Dialog
  create(ComponentOrVnode, ComponentPropsOrModalProps, modalProps) {
    if (isVNode(ComponentOrVnode)) {
      this.createByVnode(ComponentOrVnode, ComponentPropsOrModalProps);
    } else {
      this.createByComponent(ComponentOrVnode, ComponentPropsOrModalProps, modalProps);
    }
  }
  createByVnode(vnode, modalProps = {}) {
    const Component = /* @__PURE__ */ defineComponent({
      setup() {
        return () => createVNode(Fragment, null, [vnode]);
      }
    });
    this.createByComponent(Component, modalProps);
  }
  createByComponent(Component, componentProps, modalProps = {}) {
    const {
      dialogify
    } = Component;
    const ComponentWithContext = /* @__PURE__ */ defineComponent({
      setup: () => {
        const appContext = inject(DialogAppContext);
        provide(DialogContext, this);
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
          _Dialog.dialogDispatch(dialogActions.popDialog(this));
        };
        return () => {
          var _a;
          const visible = ((_a = appContext == null ? void 0 : appContext.value) == null ? void 0 : _a.showDialogs.includes(this)) || false;
          this.dialogController = {
            visible,
            onOk,
            onCancel,
            afterClose
          };
          const modalController = dialogController2ModalController(this.dialogController, _Dialog.modalControllerAdapter);
          const computedModalProps = {
            ...modalController,
            ...dialogify,
            // 优先级低于modalProps
            ...modalProps
          };
          return createVNode(_Dialog.ModalComponent, computedModalProps, {
            default: () => [createVNode(Component, componentProps, null)]
          });
        };
      }
    });
    this._ComponentWithDialogContext = ComponentWithContext;
    _Dialog.dialogDispatch(dialogActions.pushDialog(this));
  }
  // 弹出Dialog
  async show() {
    return new Promise((resolve, reject) => {
      this.dialogPromise.resolve = resolve;
      this.dialogPromise.reject = reject;
      _Dialog.dialogDispatch(dialogActions.showDialog(this));
    });
  }
  // 隐藏Dialog
  hide() {
    _Dialog.dialogDispatch(dialogActions.hideDialog(this));
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
__publicField(_Dialog, "modalControllerAdapter", antdModalAdvancedController);
let Dialog = _Dialog;
const DialogContext = Symbol("DialogContext");
const DialogAppContext = Symbol("DialogAppContext");
const DialogProvider = /* @__PURE__ */ defineComponent({
  props: {
    ModalComponent: {
      type: Object,
      required: true
    },
    modalControllerAdapter: {
      type: Function
    }
  },
  setup(props, {
    slots
  }) {
    const ModalComponent = props.ModalComponent;
    const {
      modalControllerAdapter
    } = props;
    const [store, dispatch] = useDialogReducer();
    provide(DialogAppContext, store);
    onMounted(() => {
      Dialog.install({
        ModalComponent,
        modalControllerAdapter
      });
      Dialog.dialogDispatch = dispatch;
    });
    return () => {
      var _a;
      return createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots), store.value.dialogs.map((dialog, i) => {
        const {
          ComponentWithDialogContext
        } = dialog;
        return createVNode(ComponentWithDialogContext, {
          "key": i
        }, null);
      })]);
    };
  }
});
export {
  Dialog,
  DialogContext,
  DialogProvider
};
