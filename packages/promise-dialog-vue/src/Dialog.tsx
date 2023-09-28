import type { DefineComponent, VNode, PropType, Component } from 'vue'
import type { ComponentProps, ModalProps, UnknownComponent } from './types'
import type { DialogController, ModalControllerAdapter } from './modal-controller'
import type { DialogDispatch, DialogStore } from './use-dialog-reducer'

import { inject, onMounted, provide, defineComponent, isVNode } from 'vue'
import { antdModalAdvancedController, dialogController2ModalController } from './modal-controller'
import { dialogActions, useDialogReducer } from './use-dialog-reducer'

export class Dialog {
  // 在使用之前需要先安装（在DialogProvider已经安装）
  static install(options: {
    ModalComponent: UnknownComponent
    modalControllerAdapter?: (typeof Dialog)['modalControllerAdapter']
  }) {
    const { modalControllerAdapter } = options
    Dialog._ModalComponent = options.ModalComponent
    if (modalControllerAdapter) {
      Dialog.modalControllerAdapter = modalControllerAdapter
    }
  }

  // UI库的Modal组件
  private static _ModalComponent: UnknownComponent
  static get ModalComponent() {
    if (!Dialog._ModalComponent) throw new Error('请先调用Dialog.install')
    return Dialog._ModalComponent
  }
  // ModalController适配器
  static modalControllerAdapter: ModalControllerAdapter = antdModalAdvancedController

  // 在provide后保存dispatch，通过dispatch来操作dialog
  static dialogDispatch: DialogDispatch
  // 带有dialog上下文的组件FC
  private _ComponentWithDialogContext?: DefineComponent<any, any, any>
  get ComponentWithDialogContext() {
    if (!this._ComponentWithDialogContext) throw new Error('ComponentWithDialogContext未初始化')
    return this._ComponentWithDialogContext
  }

  // 创建并弹出
  static open<R, T extends UnknownComponent<P> | VNode = any, P extends ComponentProps = any>(
    ComponentOrVnode: UnknownComponent<P> | VNode,
    ComponentPropsOrModalProps?: T extends VNode ? ModalProps : P,
    modalProps?: ModalProps
  ) {
    const dialogInstance = new Dialog()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 后续解决dialogInstance.create
    dialogInstance.create(ComponentOrVnode, ComponentPropsOrModalProps, modalProps)
    return dialogInstance.show<R>()
  }

  // 清除所有的dialog
  static clearDialogs() {
    Dialog.dialogDispatch(dialogActions.clearDialogs())
  }
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
  create<P extends ComponentProps>(
    Component: UnknownComponent<P>,
    componentProps?: ComponentProps,
    modalProps?: ModalProps
  ): void
  create(vnode: VNode, modalProps?: ModalProps): void
  create<T extends UnknownComponent<P> | VNode, P extends ComponentProps>(
    ComponentOrVnode: UnknownComponent<P> | VNode,
    ComponentPropsOrModalProps?: T extends VNode ? ModalProps : P,
    modalProps?: ModalProps
  ): void {
    if (isVNode(ComponentOrVnode)) {
      this.createByVnode(ComponentOrVnode, ComponentPropsOrModalProps)
    } else {
      this.createByComponent(ComponentOrVnode, ComponentPropsOrModalProps, modalProps)
    }
  }
  createByVnode(vnode: VNode, modalProps: ModalProps = {}) {
    const Component = defineComponent({
      setup() {
        return () => <>{vnode}</>
      }
    })
    this.createByComponent(Component, modalProps)
  }
  createByComponent<P extends ComponentProps>(
    Component: UnknownComponent<P>,
    componentProps?: ComponentProps,
    modalProps: ModalProps = {}
  ) {
    const { dialogify } = Component
    const ComponentWithContext = defineComponent({
      setup: () => {
        const appContext = inject<DialogStore>(DialogAppContext)
        provide(DialogContext, this)

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

        return () => {
          const visible = appContext?.value?.showDialogs.includes(this) || false
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
        }
      }
    })
    this._ComponentWithDialogContext = ComponentWithContext
    // 创建的时候才保存
    Dialog.dialogDispatch(dialogActions.pushDialog(this))
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
  cancel = (resolveResult?: unknown) => {
    this.dialogPromise.reject?.(resolveResult)
    this.hide?.()
  }
}

// dialog上下文：用于在弹窗里获取dialog
export const DialogContext = Symbol('DialogContext')

// app上下文
const DialogAppContext = Symbol('DialogAppContext')
export const DialogProvider = defineComponent({
  props: {
    ModalComponent: {
      type: Object as PropType<UnknownComponent | Component>,
      required: true
    },
    modalControllerAdapter: {
      type: Function as PropType<ModalControllerAdapter>
    }
  },
  setup(props, { slots }) {
    // FIXME: 修复类型
    const ModalComponent = props.ModalComponent as UnknownComponent
    const { modalControllerAdapter } = props
    const [store, dispatch] = useDialogReducer()
    provide(DialogAppContext, store)

    onMounted(() => {
      Dialog.install({ ModalComponent, modalControllerAdapter })
      Dialog.dialogDispatch = dispatch
    })

    return () => {
      return (
        <>
          {slots.default?.()}
          {store.value.dialogs.map((dialog, i) => {
            const { ComponentWithDialogContext } = dialog
            return <ComponentWithDialogContext key={i}></ComponentWithDialogContext>
          })}
        </>
      )
    }
  }
})
