import type { DefineComponent, VNode, PropType, Component } from 'vue';
import type { ComponentProps, ModalProps, UnknownComponent } from './types';
import type { DialogController, ModalControllerAdapter } from './modal-controller';
import type { DialogDispatch } from './use-dialog-reducer';
export declare class Dialog {
    static install(options: {
        ModalComponent: UnknownComponent;
        modalControllerAdapter?: (typeof Dialog)['modalControllerAdapter'];
    }): void;
    private static _ModalComponent;
    static get ModalComponent(): UnknownComponent;
    static modalControllerAdapter: ModalControllerAdapter;
    static dialogDispatch: DialogDispatch;
    private _ComponentWithDialogContext?;
    get ComponentWithDialogContext(): DefineComponent<any, any, any>;
    static open<R, T extends UnknownComponent<P> | VNode = any, P extends ComponentProps = any>(ComponentOrVnode: UnknownComponent<P> | VNode, ComponentPropsOrModalProps?: T extends VNode ? ModalProps : P, modalProps?: ModalProps): Promise<R>;
    static clearDialogs(): void;
    dialogController: DialogController | null;
    dialogPromise: {
        resolve?: (resolveResult?: any) => void;
        reject?: (rejectResult?: any) => void;
    };
    onConfirmCallback?: (dialog: Dialog) => void;
    onCancelCallback?: (dialog: Dialog) => void;
    create<P extends ComponentProps>(Component: UnknownComponent<P>, componentProps?: ComponentProps, modalProps?: ModalProps): void;
    create(vnode: VNode, modalProps?: ModalProps): void;
    createByVnode(vnode: VNode, modalProps?: ModalProps): void;
    createByComponent<P extends ComponentProps>(Component: UnknownComponent<P>, componentProps?: ComponentProps, modalProps?: ModalProps): void;
    show<R>(): Promise<R>;
    hide(): void;
    onConfirm(callback: Dialog['onConfirmCallback']): void;
    onCancel(callback: Dialog['onCancelCallback']): void;
    confirm: (resolveResult?: unknown) => void;
    cancel: (resolveResult?: unknown) => void;
}
export declare const DialogContext: unique symbol;
export declare const DialogProvider: DefineComponent<{
    ModalComponent: {
        type: PropType<UnknownComponent | Component>;
        required: true;
    };
    modalControllerAdapter: {
        type: PropType<ModalControllerAdapter>;
    };
}, () => import("vue/jsx-runtime").JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    ModalComponent: {
        type: PropType<UnknownComponent | Component>;
        required: true;
    };
    modalControllerAdapter: {
        type: PropType<ModalControllerAdapter>;
    };
}>>, {}, {}>;
