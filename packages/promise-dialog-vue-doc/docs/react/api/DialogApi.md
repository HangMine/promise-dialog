# Dialog
promise-dialog的实例

#### 类型
```ts
export declare class Dialog {
    static install(options: {
        ModalComponent: React.FC;
        modalControllerAdapter?: (typeof Dialog)['modalControllerAdapter'];
    }): void;
    private static _ModalComponent;
    static get ModalComponent(): UnkownFC;
    static modalControllerAdapter: ModalControllerAdapter;
    static dialogDispatch: React.Dispatch<DialogAction>;
    private _ComponentWithDialogContext?;
    get ComponentWithDialogContext(): UnkownFC;
    static open<R, T = DialogFC | React.ReactNode>(ReactNodeOrComponent: T, componentPropsOrModalProps?: T extends DialogFC<infer P> ? P : ModalProps, modalProps?: ModalProps): Promise<R>;
    static clearDialogs(): void;
    static isReactNode(value: React.ReactNode | DialogFC): value is React.ReactNode;
    dialogController: DialogController | null;
    dialogPromise: {
        resolve?: (resolveResult?: any) => void;
        reject?: (rejectResult?: any) => void;
    };
    onConfirmCallback?: (dialog: Dialog) => void;
    onCancelCallback?: (dialog: Dialog) => void;
    create<P extends ModalProps>(Component: DialogFC<P>, componentProps?: P, modalProps?: ModalProps): void;
    create(reactNode: React.ReactNode, modalProps?: ModalProps): void;
    createByReactNode(reactNode: React.ReactNode, modalProps?: ModalProps): void;
    createByComponent<P extends ModalProps>(Component: DialogFC<P>, componentProps: P, modalProps?: ModalProps): void;
    show<R>(): Promise<R>;
    hide(): void;
    onConfirm(callback: Dialog['onConfirmCallback']): void;
    onCancel(callback: Dialog['onCancelCallback']): void;
    confirm: (resolveResult?: unknown) => void;
    cancel: (rejectResult?: unknown) => void;
}
```

## Dialog.clearDialogs
可通过该方法关闭当前所有模态框
#### 类型
```ts
static clearDialogs(): void;
```
## Dialog.open
useDialog().dialog等同于该方法