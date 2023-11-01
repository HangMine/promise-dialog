import { createContext, isValidElement, PropsWithChildren, useContext, useEffect } from 'react'

import {
  antdModalAdvancedController,
  arcoDesignController,
  DialogController,
  dialogController2ModalController,
  ModalControllerAdapter
} from './modal-controller'
import { ComponentProps, DialogFC, ModalProps, UnkownFC } from './types'
import { DialogAction, dialogActions, DialogStore, useDialogReducer } from './use-dialog-reducer'
import { uniqueId } from 'lodash-es'
export class Dialog {
  // 在使用之前需要先安装
  static install(options: {
    ModalComponent: React.FC
    modalControllerAdapter?: (typeof Dialog)['modalControllerAdapter']
  }) {
    const { modalControllerAdapter } = options
    Dialog._ModalComponent = options.ModalComponent
    if (modalControllerAdapter) {
      Dialog.modalControllerAdapter = modalControllerAdapter
    }
  }

  // UI库的Modal组件
  private static _ModalComponent: UnkownFC
  static get ModalComponent() {
    if (!Dialog._ModalComponent) throw new Error('请先调用Dialog.install')
    return Dialog._ModalComponent
  }
  // ModalController适配器
  static modalControllerAdapter: ModalControllerAdapter = antdModalAdvancedController

  // 在provide后保存dispatch，通过dispatch来操作dialog
  static dialogDispatch: React.Dispatch<DialogAction>
  // 带有dialog上下文的组件FC
  private _ComponentWithDialogContext?: UnkownFC
  get ComponentWithDialogContext() {
    if (!this._ComponentWithDialogContext) throw new Error('ComponentWithDialogContext未初始化')
    return this._ComponentWithDialogContext
  }
  // 创建并弹出(业务用的是该函数)
  static open<R, T = DialogFC | React.ReactNode>(
    ReactNodeOrComponent: T,
    componentPropsOrModalProps?: T extends DialogFC<infer P> ? P : ModalProps,
    modalProps: ModalProps = {}
  ) {
    const dialogInstance = new Dialog()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 后续解决dialogInstance.create
    dialogInstance.create(ReactNodeOrComponent, componentPropsOrModalProps, modalProps)
    return dialogInstance.show<R>()
  }
  // 清除所有的dialog
  static clearDialogs() {
    Dialog.dialogDispatch(dialogActions.clearDialogs())
  }
  // 判断是否是ReactNode，不够严谨，但应该满足业务需要
  static isReactNode(value: React.ReactNode | DialogFC): value is React.ReactNode {
    return isValidElement(value)
  }

  // dialog的唯一标识
  id = uniqueId('promise-dialog-')

  // 弹窗控制器
  dialogController: DialogController | null = null

  // 弹窗promise，用于控制异步流程
  dialogPromise: {
    resolve?: (resolveResult?: any) => void
    reject?: (rejectResult?: any) => void
  } = {}

  // 自带footer的确认回调
  onConfirmCallback?: (dialog: Dialog) => void
  // 自带footer的取消回调
  onCancelCallback?: (dialog: Dialog) => void
  // 创建Dialog
  create<P extends ModalProps>(
    Component: DialogFC<P>,
    componentProps?: P,
    modalProps?: ModalProps
  ): void
  create(reactNode: React.ReactNode, modalProps?: ModalProps): void
  create<T extends DialogFC<P> | React.ReactNode, P extends ComponentProps>(
    ReactNodeOrComponent: T,
    componentPropsOrModalProps?: T extends React.ReactNode ? ModalProps : P,
    modalProps: ModalProps = {}
  ): void {
    if (Dialog.isReactNode(ReactNodeOrComponent)) {
      this.createByReactNode(ReactNodeOrComponent, componentPropsOrModalProps as ModalProps)
    } else {
      this.createByComponent(ReactNodeOrComponent, componentPropsOrModalProps as P, modalProps)
    }
    // 创建的时候才保存
    Dialog.dialogDispatch(dialogActions.pushDialog(this))
  }
  // 通过ReactNode创建Dialog
  createByReactNode(reactNode: React.ReactNode, modalProps: ModalProps = {}) {
    this.createByComponent(() => <>{reactNode}</>, {}, modalProps)
  }
  // 通过组件创建Dialog
  createByComponent<P extends ModalProps>(
    Component: DialogFC<P>,
    componentProps: P,
    modalProps: ModalProps = {}
  ) {
    const { dialogify } = Component
    const ComponentWithContext = withDialogContext(() => {
      const appContext = useContext(DialogAppContext)
      const visible = appContext?.showDialogs.includes(this) || false
      const onOk = async () => {
        await this.onConfirmCallback?.(this)
        this.hide()
      }

      const onCancel = async () => {
        await this.onCancelCallback?.(this)
        this.hide()
      }

      const afterClose = async () => {
        Dialog.dialogDispatch(dialogActions.popDialog(this))
      }

      this.dialogController = {
        visible,
        onOk,
        onCancel,
        afterClose
      }

      const modalController = dialogController2ModalController(
        this.dialogController,
        Dialog.modalControllerAdapter
      )

      const computedModalProps = {
        ...modalController,
        ...dialogify, // 优先级低于modalProps
        ...modalProps
      }

      return (
        <Dialog.ModalComponent {...computedModalProps}>
          <Component {...componentProps}></Component>
        </Dialog.ModalComponent>
      )
    }, this)
    this._ComponentWithDialogContext = ComponentWithContext
  }
  // 弹出Dialog
  async show<R>() {
    return new Promise<R>((resolve, reject) => {
      this.dialogPromise.resolve = resolve
      this.dialogPromise.reject = reject
      Dialog.dialogDispatch(dialogActions.showDialog(this))
    })
  }
  // 隐藏Dialog
  hide() {
    Dialog.dialogDispatch(dialogActions.hideDialog(this))
  }
  // 自带footer的确认
  onConfirm(callback: Dialog['onConfirmCallback']) {
    this.onConfirmCallback = callback
  }
  // 自带footer的取消
  onCancel(callback: Dialog['onCancelCallback']) {
    this.onCancelCallback = callback
  }
  // 自定义的confirm(外部会直接调用，通过箭头函数保证this指向)
  confirm = (resolveResult?: unknown) => {
    this.dialogPromise.resolve?.(resolveResult)
    this.hide?.()
  }
  // 自定义的cancel(外部会直接调用，通过箭头函数保证this指向)
  cancel = (rejectResult?: unknown) => {
    this.dialogPromise.reject?.(rejectResult)
    this.hide?.()
  }
}

// dialog上下文：用于在弹窗里获取dialog
export const DialogContext = createContext<Dialog | null>(null)
// HOC:添加DialogContext(这里不用考虑WrappedComponent的静态方法和forwardRef)
function withDialogContext(WrappedComponent: UnkownFC, dialog: Dialog) {
  const ComponentWithDialog = (props: PropsWithChildren<unknown>) => {
    return (
      <DialogContext.Provider value={dialog}>
        <WrappedComponent {...props}></WrappedComponent>
      </DialogContext.Provider>
    )
  }
  ComponentWithDialog.displayName = `withDialogContext(${WrappedComponent.displayName})`
  return ComponentWithDialog
}

// app上下文
const DialogAppContext = createContext<DialogStore | null>(null)
export function DialogProvider(
  props: PropsWithChildren<Parameters<(typeof Dialog)['install']>[0]>
) {
  const { children, ModalComponent, modalControllerAdapter } = props
  const [store, dispatch] = useDialogReducer()

  useEffect(() => {
    Dialog.install({ ModalComponent, modalControllerAdapter })
    Dialog.dialogDispatch = dispatch
  }, [dispatch, ModalComponent, modalControllerAdapter])

  return (
    <DialogAppContext.Provider value={store}>
      {children}
      {store.dialogs.map((dialog) => {
        const { ComponentWithDialogContext, id } = dialog
        return <ComponentWithDialogContext key={id}></ComponentWithDialogContext>
      })}
    </DialogAppContext.Provider>
  )
}
