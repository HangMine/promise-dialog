import { defineComponent, DefineComponent, isVNode, VNode } from '@vue/runtime-core';
import { inject, onMounted, provide } from 'vue';

import {
  arcoDesignController,
  DialogController,
  dialogController2ModalController,
  ModalControllerAdapter,
} from './modal-controller';
import {
  ComponentProps,
  CreateByComponentParams,
  CreateByVnodeParams,
  CreateParams,
  ModalProps,
  UnknownComponent,
} from './types';
import { dialogActions, DialogDispatch, DialogStore, useDialogReducer } from './use-dialog-reducer';

export class Dialog {
  // 在使用之前需要先安装
  static install(options: {
    ModalComponent: UnknownComponent;
    modalControllerAdapter?: (typeof Dialog)['modalControllerAdapter'];
  }) {
    const { modalControllerAdapter } = options;
    Dialog._ModalComponent = options.ModalComponent;
    if (modalControllerAdapter) {
      Dialog.modalControllerAdapter = modalControllerAdapter;
    }
  }

  // UI库的Modal组件
  private static _ModalComponent: UnknownComponent;
  static get ModalComponent() {
    if (!Dialog._ModalComponent) throw new Error('请先调用Dialog.install');
    return Dialog._ModalComponent;
  }
  // ModalController适配器
  static modalControllerAdapter: ModalControllerAdapter = arcoDesignController;

  // 在provide后保存dispatch，通过dispatch来操作dialog
  static dialogDispatch: DialogDispatch;
  // 带有dialog上下文的组件FC
  private _ComponentWithDialogContext?: DefineComponent<any, any, any>;
  get ComponentWithDialogContext() {
    if (!this._ComponentWithDialogContext) throw new Error('ComponentWithDialogContext未初始化');
    return this._ComponentWithDialogContext;
  }

  // 清除所有的dialog
  static clearDialogs() {
    Dialog.dialogDispatch(dialogActions.clearDialogs());
  }
  // 弹窗控制器
  dialogController: DialogController | null = null;

  // 弹窗promise，用于控制异步流程
  dialogPromise: {
    resolve?: (resolveResult?: unknown) => void;
    reject?: (rejectResult?: unknown) => void;
  } = {};
  // 自带footer的确认回调
  onConfirmCallback?: (dialog: Dialog) => void;
  // 自带footer的取消回调
  onCancelCallback?: (dialog: Dialog) => void;
  // 创建Dialog
  create<P extends ComponentProps>(...args: CreateByComponentParams<P>): void;
  create(...args: CreateByVnodeParams): void;
  create<T extends UnknownComponent<P> | VNode, P extends ComponentProps>(...args: CreateParams<T, P>): void {
    const [ComponentOrVnode, ComponentPropsOrModalProps, modalProps] = args;
    if (isVNode(ComponentOrVnode)) {
      this.createByVnode(ComponentOrVnode, ComponentPropsOrModalProps as ModalProps);
    } else {
      this.createByComponent(ComponentOrVnode, ComponentPropsOrModalProps, modalProps);
    }
  }
  createByVnode(vnode: VNode, modalProps: ModalProps = {}) {
    const Component = defineComponent({
      setup() {
        return () => <>{vnode}</>;
      },
    });
    this.createByComponent(Component, modalProps);
  }
  createByComponent(Component: UnknownComponent, componentProps?: ComponentProps, modalProps: ModalProps = {}) {
    const { dialogify } = Component;
    const ComponentWithContext = defineComponent({
      setup: () => {
        const appContext = inject<DialogStore>(DialogAppContext);
        provide(DialogContext, this);

        const onOk = async () => {
          await this.onConfirmCallback?.(this);
          this.hide();
        };

        const onCancel = async () => {
          await this.onCancelCallback?.(this);
          this.hide();
        };

        const afterClose = async () => {
          Dialog.dialogDispatch(dialogActions.popDialog(this));
        };

        return () => {
          const visible = appContext?.value?.showDialogs.includes(this) || false;
          this.dialogController = {
            visible,
            onOk,
            onCancel,
            afterClose,
          };

          const modalController = dialogController2ModalController(
            this.dialogController,
            Dialog.modalControllerAdapter,
          );

          const computedModalProps = {
            ...modalController,
            ...dialogify, // 优先级低于modalProps
            ...modalProps,
          };

          return (
            <Dialog.ModalComponent {...computedModalProps}>
              <Component {...componentProps}></Component>
            </Dialog.ModalComponent>
          );
        };
      },
    });
    this._ComponentWithDialogContext = ComponentWithContext;
    // 创建的时候才保存
    Dialog.dialogDispatch(dialogActions.pushDialog(this));
  }

  // 弹出Dialog
  async show<R>() {
    return new Promise<R>((resolve, reject) => {
      this.dialogPromise.resolve = resolve;
      this.dialogPromise.reject = reject;
      Dialog.dialogDispatch(dialogActions.showDialog(this));
    });
  }
  // 隐藏Dialog
  hide() {
    Dialog.dialogDispatch(dialogActions.hideDialog(this));
  }
  // 自带footer的确认
  onConfirm(callback: Dialog['onConfirmCallback']) {
    this.onConfirmCallback = callback;
  }
  // 自带footer的取消
  onCancel(callback: Dialog['onCancelCallback']) {
    this.onCancelCallback = callback;
  }
  // 自定义的confirm(外部会直接调用，通过箭头函数保证this指向)
  confirm = (resolveResult?: unknown) => {
    this.dialogPromise.resolve?.(resolveResult);
    this.hide?.();
  };
  // 自定义的cancel(外部会直接调用，通过箭头函数保证this指向)
  cancel = (resolveResult?: unknown) => {
    this.dialogPromise.reject?.(resolveResult);
    this.hide?.();
  };
}

// dialog上下文：用于在弹窗里获取dialog
export const DialogContext = Symbol('DialogContext');

// app上下文
const DialogAppContext = Symbol('DialogAppContext');
export const CatalogProvider = defineComponent({
  props: {
    ModalComponent: {
      type: Object as PropType<UnknownComponent>,
      required: true,
    },
    modalControllerAdapter: {
      type: Function as PropType<ModalControllerAdapter>,
    },
  },
  setup(props, { slots }) {
    const { ModalComponent, modalControllerAdapter } = props;
    const [store, dispatch] = useDialogReducer();
    provide(DialogAppContext, store);

    onMounted(() => {
      Dialog.install({ ModalComponent, modalControllerAdapter });
      Dialog.dialogDispatch = dispatch;
    });

    return () => {
      return (
        <>
          {slots.default?.()}
          {store.value.dialogs.map((dialog, i) => {
            const { ComponentWithDialogContext } = dialog;
            return <ComponentWithDialogContext key={i}></ComponentWithDialogContext>;
          })}
        </>
      );
    };
  },
});

// declare module '@vue/runtime-core' {
//   interface ComponentCustomOptions {
//     dialogify?: ModalProps | (() => ModalProps);
//   }
// }
