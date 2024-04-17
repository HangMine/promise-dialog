import { uniqueId } from 'lodash-es'
import React, {
  cloneElement,
  createContext,
  isValidElement,
  PropsWithChildren,
  useContext,
  useEffect
} from 'react'

import {
  arcoDesignController,
  DialogController,
  dialogController2ModalController,
  ModalControllerAdapter
} from './modal-controller'
import { ComponentProps, DialogFC, ModalProps, UnkownFC } from './types'
import { DialogAction, dialogActions, DialogStore, useDialogReducer } from './use-dialog-reducer'

export class Dialog {
  // 在使用之前需要先安装
  static install(options: {
    ModalComponent: React.FC
    modalControllerAdapter?: (typeof Dialog)['modalControllerAdapter']
    DrawerComponent: React.FC
    drawerControllerAdapter?: (typeof Dialog)['modalControllerAdapter']
  }) {
    const { modalControllerAdapter, drawerControllerAdapter } = options
    Dialog._ModalComponent = options.ModalComponent
    Dialog._DrawerComponent = options.DrawerComponent
    if (modalControllerAdapter) {
      Dialog.modalControllerAdapter = modalControllerAdapter
    }
    if (drawerControllerAdapter) {
      Dialog.drawerControllerAdapter = drawerControllerAdapter
    }
  }

  // UI库的Modal组件
  private static _ModalComponent: UnkownFC
  static get ModalComponent() {
    if (!Dialog._ModalComponent) throw new Error('请先调用Dialog.install')
    return Dialog._ModalComponent
  }
  // UI库的Drawer组件
  private static _DrawerComponent: UnkownFC
  static get DrawerComponent() {
    if (!Dialog._DrawerComponent) throw new Error('请先调用Dialog.install')
    return Dialog._DrawerComponent
  }
  // ModalController适配器
  static modalControllerAdapter: ModalControllerAdapter = arcoDesignController

  // DrawerController适配器
  static drawerControllerAdapter: ModalControllerAdapter = arcoDesignController

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
  // 创建并弹出Drawer(业务用的是该函数)
  static openDrawer<R, T = DialogFC | React.ReactNode>(
    ReactNodeOrComponent: T,
    componentPropsOrModalProps?: T extends DialogFC<infer P> ? P : ModalProps,
    modalProps: ModalProps = {}
  ) {
    const dialogInstance = new Dialog()
    dialogInstance.ActiveDialogComponent = Dialog.DrawerComponent
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

  static store: DialogStore

  // dialog实例唯一标识
  id = uniqueId('dialog_')

  // 弹窗控制器
  dialogController: DialogController | null = null

  // 弹窗promise，用于控制异步流程
  dialogPromise: {
    resolve?: (resolveResult?: any) => void
    reject?: (rejectResult?: any) => void
  } = {}

  // 当前活跃的弹窗组件：比如可能是Modal，也可能是Drawer
  ActiveDialogComponent: UnkownFC = Dialog.ModalComponent

  // 自带footer的确认回调
  onConfirmCallback?: (dialog: Dialog) => void
  // 自带footer的取消回调
  onCancelCallback?: (dialog: Dialog) => void
  // updateModalPropsAfterOpen的回调
  afterOpenCallback?: (dialog: Dialog) => void
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
      this._ComponentWithDialogContext = this.createByReactNode(
        ReactNodeOrComponent,
        componentPropsOrModalProps as ModalProps
      )
    } else {
      this._ComponentWithDialogContext = this.createByComponent(
        ReactNodeOrComponent,
        componentPropsOrModalProps as P,
        modalProps
      )
    }
    // 创建的时候才保存
    Dialog.dialogDispatch(dialogActions.pushDialog(this))
  }
  // 通过ReactNode创建Dialog
  createByReactNode(reactNode: React.ReactNode, modalProps: ModalProps = {}) {
    const ReactNodeComponent: DialogFC<ComponentProps> = (props) => {
      return cloneElement(reactNode as React.ReactElement, props)
    }

    const computedModalProps = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...reactNode?.type?.dialogify, // 优先级低于modalProps
      ...modalProps
    }

    return this.createByComponent(ReactNodeComponent, {}, computedModalProps)
  }
  // 通过组件创建Dialog
  createByComponent<P extends ModalProps>(
    Component: DialogFC<P>,
    componentProps: P,
    modalProps: ModalProps = {}
  ) {
    const { ActiveDialogComponent } = this
    const { dialogify } = Component
    const ComponentWithContext = withDialogContext(
      (props: { injectModalProps: ModalProps; injectComponentProps: ComponentProps }) => {
        const appContext = useContext(DialogAppContext)
        const visible = appContext?.showDialogs.includes(this) || false
        const onOk = async () => {
          try {
            await this.onConfirmCallback?.(this)
            this.hide()
          } catch (error) {
            // HACK: 用于解决arco-design自带footer的onOk不reject的问题
            setTimeout(() => {
              throw Promise.reject(error)
            }, 0)
          }
        }

        const onCancel = async () => {
          await this.onCancelCallback?.(this)
          // 解决通过X图标关闭时不reject的问题： 但用自带的footer的时候，reject的时候会在cancel时触发一次，这里又触发一次，但不影响
          this.dialogPromise?.reject?.()
          this.hide()
        }

        const afterClose = async () => {
          this.remove()
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
          ...modalProps,
          ...props.injectModalProps
        }

        const computedComponentProps = {
          ...componentProps,
          ...props.injectComponentProps
        }

        const overRideAfterOpen = async () => {
          // @ts-expect-error
          const { afterOpen } = computedModalProps
          await afterOpen?.()
          this.afterOpenCallback?.(this)
        }

        return (
          <ActiveDialogComponent {...computedModalProps} afterOpen={overRideAfterOpen}>
            <Component {...computedComponentProps} />
          </ActiveDialogComponent>
        )
      },
      this
    )
    return ComponentWithContext
  }
  // 更新
  update<T extends DialogFC<P> | React.ReactNode, P extends ComponentProps>(
    ReactNodeOrComponent: T,
    componentPropsOrModalProps?: T extends React.ReactNode ? ModalProps : P,
    modalProps: ModalProps = {}
  ): void {
    const updateComponentProps = Dialog.isReactNode(ReactNodeOrComponent)
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (ReactNodeOrComponent?.props as P)
      : (componentPropsOrModalProps as P)
    const updateModalProps = Dialog.isReactNode(ReactNodeOrComponent)
      ? (componentPropsOrModalProps as ModalProps)
      : (modalProps as ModalProps)
    this.updateModalProps(updateModalProps)
    this.updateComponentProps(updateComponentProps)
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
  // 清除Dialog
  remove() {
    Dialog.dialogDispatch(dialogActions.popDialog(this))
    this.removeInjectedProps()
    this.removeComponentProps()
  }
  // 自带footer的确认
  onConfirm(
    callback: Dialog['onConfirmCallback'],
    // 开启该选项后，当【回调函数已经存在&&函数体不相同】时，不会重新设置，目前用于以下场景：
    // 组件即可作为dialog，也可作为普通组件使用，当作为普通组件被使用时，普通组件不能覆盖onConfirm
    options: { notSetWhenFnExsitAndFnBodyNotSame?: boolean } = {}
  ) {
    if (options.notSetWhenFnExsitAndFnBodyNotSame) {
      if (this.onConfirmCallback && callback?.toString() !== this.onConfirmCallback?.toString()) {
        return
      }
    }
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
  cancel = (resolveResult?: unknown) => {
    this.dialogPromise.reject?.(resolveResult)
    this.hide?.()
  }
  // 更新模态框props
  updateModalProps = (props: ModalProps) => {
    Dialog.dialogDispatch(dialogActions.updateModalProps(this, props))
  }
  // 在动画结束之后更新模态框props
  updateModalPropsAfterOpen = (callback: Dialog['afterOpenCallback']) => {
    this.afterOpenCallback = callback
  }
  // 移除注入的模态框props
  removeInjectedProps = () => {
    Dialog.dialogDispatch(dialogActions.removeInjectModalProps(this))
  }
  // 更新组件props
  updateComponentProps = (injectComponentProps: DialogStore['injectComponentPropsMap'][string]) => {
    Dialog.dialogDispatch(dialogActions.updateComponentProps(this, injectComponentProps))
  }
  // 移除注入的组件props
  removeComponentProps = () => {
    Dialog.dialogDispatch(dialogActions.removeInjectComponentProps(this))
  }
}

// dialog上下文：用于在弹窗里获取dialog
export const DialogContext = createContext<Dialog | null>(null)
// HOC:添加DialogContext(这里不用考虑WrappedComponent的静态方法和forwardRef)
function withDialogContext(WrappedComponent: UnkownFC, dialog: Dialog) {
  const ComponentWithDialog = (props: PropsWithChildren<unknown>) => {
    return (
      <DialogContext.Provider value={dialog}>
        <WrappedComponent {...props} />
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
  const {
    children,
    ModalComponent,
    modalControllerAdapter,
    DrawerComponent,
    drawerControllerAdapter
  } = props
  const [store, dispatch] = useDialogReducer()

  useEffect(() => {
    Dialog.install({
      ModalComponent,
      modalControllerAdapter,
      DrawerComponent,
      drawerControllerAdapter
    })
    Dialog.dialogDispatch = dispatch
  }, [dispatch, ModalComponent, modalControllerAdapter])

  useEffect(() => {
    Dialog.store = store
  }, [store])

  return (
    <DialogAppContext.Provider value={store}>
      {children}
      {store.dialogs.map((dialog, i) => {
        const { ComponentWithDialogContext, id } = dialog
        const injectModalProps = store.injectModalPropsMap[id]
        const injectComponentProps = store.injectComponentPropsMap[id]

        return (
          <ComponentWithDialogContext
            key={id}
            injectModalProps={injectModalProps}
            injectComponentProps={injectComponentProps}
          />
        )
      })}
    </DialogAppContext.Provider>
  )
}
