/**
 * @deprecated 这是使用NiceModal的方式，已经废弃
 */
import NiceModal, { NiceModalHandler, useModal } from '@ebay/nice-modal-react';
import { createContext, isValidElement, PropsWithChildren, useEffect } from 'react';
import { TtModal, TtModalProps } from 'tt-components';

export type DialogFC<P> = React.FC<P> & {
  dialogify?: TtModalProps;
};

export class Dialog {
  // 已创建的dialog数组
  static dialogs: Dialog[] = [];
  // 被NiceModal.create创建的函数组件
  niceModalFC?: ReturnType<typeof NiceModal.create>;
  //  弹窗里的niceModalHandler
  niceModalHandler?: NiceModalHandler;
  //  自带footer的确认回调
  onConfirmCallback?: (dialog: Dialog) => void;
  //  自带footer的取消回调
  onCancelCallback?: (dialog: Dialog) => void;
  // 清除所有的dialog
  static clearDialogs() {
    Dialog.dialogs.forEach((dialog) => {
      dialog.cancel();
    });
  }
  // 判断是否是ReactNode，不够严谨，但应该满足业务需要
  static isReactNode(value: React.ReactNode | React.FC<any>): value is React.ReactNode {
    return isValidElement(value);
  }
  // 创建Dialog
  create<P extends Recordable>(
    Component: DialogFC<P>,
    componentProps?: P,
    modalProps?: TtModalProps,
  ): void;
  create(reactNode: React.ReactNode, modalProps?: TtModalProps): void;
  create<T extends DialogFC<P> | React.ReactNode, P extends Recordable>(
    ReactNodeOrComponent: T,
    componentPropsOrModalProps: T extends React.ReactNode ? TtModalProps : P,
    modalProps: TtModalProps = {},
  ): void {
    if (Dialog.isReactNode(ReactNodeOrComponent)) {
      this.createByReactNode(
        ReactNodeOrComponent,
        componentPropsOrModalProps as TtModalProps,
      );
    } else {
      // 如果是组件，需要获取dialogify，优先级低于modalProps
      const { dialogify } = ReactNodeOrComponent;
      this.createByComponent(ReactNodeOrComponent, componentPropsOrModalProps as P, {
        ...dialogify,
        ...modalProps,
      });
    }
    // 创建的时候才保存
    Dialog.dialogs.push(this);
  }
  // 通过ReactNode创建Dialog
  createByReactNode(reactNode: React.ReactNode, modalProps: TtModalProps = {}) {
    this.createByComponent(() => <>{reactNode}</>, {}, modalProps);
  }
  // 通过组件创建Dialog
  createByComponent<P extends Recordable>(
    Component: React.FC<P>,
    componentProps: P,
    modalProps: TtModalProps = {},
  ) {
    const ComponentWithContext = withDialogContext(() => {
      return (
        <DialogInner modalProps={modalProps} dialog={this}>
          <Component {...componentProps}></Component>
        </DialogInner>
      );
    }, this);

    this.niceModalFC = NiceModal.create(ComponentWithContext);
  }
  // 弹出Dialog
  async show() {
    if (!this.niceModalFC) throw new Error('请先调用create方法');
    return NiceModal.show(this.niceModalFC);
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
  confirm = (resolveResult?: any) => {
    this.niceModalHandler?.resolve(resolveResult);
    this.niceModalHandler?.hide();
  };
  // 自定义的cancel(外部会直接调用，通过箭头函数保证this指向)
  cancel = (resolveResult?: any) => {
    this.niceModalHandler?.reject(resolveResult);
    this.niceModalHandler?.hide();
  };
}

// 弹窗里的组件
function DialogInner(
  props: PropsWithChildren<{
    modalProps: TtModalProps;
    dialog: Dialog;
  }>,
) {
  const niceModalHandler = useModal();
  const { children, dialog, modalProps } = props;

  const privateModalProps = {
    visible: niceModalHandler.visible,
    onOk,
    onCancel,
    afterClose,
  };
  const computedModalProps = {
    ...privateModalProps,
    ...modalProps,
  };
  useEffect(() => {
    dialog.niceModalHandler = niceModalHandler;
  }, [dialog, niceModalHandler]);

  async function onOk() {
    await dialog.onConfirmCallback?.(dialog);
    niceModalHandler.hide();
  }

  async function onCancel() {
    await dialog.onCancelCallback?.(dialog);
    niceModalHandler.hide();
  }

  function afterClose() {
    niceModalHandler?.remove();
    Dialog.dialogs.splice(Dialog.dialogs.indexOf(dialog), 1);
  }

  return <TtModal {...computedModalProps}>{children}</TtModal>;
}

// dialog上下文：用于在弹窗里获取dialog
export const DialogContext = createContext<Dialog | null>(null);
// HOC:添加DialogContext(这里不用考虑WrappedComponent的静态方法和forwardRef)
function withDialogContext(WrappedComponent: React.FC<any>, dialog: Dialog) {
  const ComponentWithDialog = (props: PropsWithChildren<any>) => {
    return (
      <DialogContext.Provider value={dialog}>
        <WrappedComponent {...props}></WrappedComponent>
      </DialogContext.Provider>
    );
  };
  ComponentWithDialog.displayName = `withDialogContext(${WrappedComponent.displayName})`;
  return ComponentWithDialog;
}
