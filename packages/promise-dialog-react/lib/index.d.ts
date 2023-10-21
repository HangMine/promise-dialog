/// <reference types="react" />

import { Context } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { PropsWithChildren } from 'react';

export declare function antdController(dialogController: DialogController): DialogController;

export declare function antdModalAdvancedController(dialogController: DialogController): {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    afterClose: () => void;
};

export declare function arcoDesignController(dialogController: DialogController): DialogController;

export declare type ComponentProps = Record<PropertyKey, any>;

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
    cancel: (resolveResult?: unknown) => void;
}

declare type DialogAction = {
    type: string;
    payload?: any;
};

export declare const DialogContext: Context<Dialog | null>;

export declare type DialogController = {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    afterClose: () => void;
};

export declare function dialogController2ModalController(dialogController: DialogController, adapter: ModalControllerAdapter): DialogController | Record<string, unknown> | {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    afterClose: () => void;
};

export declare interface DialogFC<P = any> extends React.FC<P> {
    dialogify?: ModalProps;
}

export declare function DialogProvider(props: PropsWithChildren<Parameters<(typeof Dialog)['install']>[0]>): JSX_2.Element;

export declare type ModalControllerAdapter = typeof antdModalAdvancedController | typeof antdController | typeof arcoDesignController | ((dialogController: DialogController) => Record<string, unknown>);

export declare interface ModalProps extends Record<PropertyKey, any> {
}

export declare type UnkownFC<P extends ComponentProps = any> = React.FC<P>;

export declare function useDialog(): {
    dialog: typeof Dialog.open;
    onConfirm: (callback: ((dialog: Dialog) => void) | undefined) => void;
    confirm: (resolveResult?: unknown) => void;
    onCancel: (callback: ((dialog: Dialog) => void) | undefined) => void;
    cancel: (resolveResult?: unknown) => void;
    confirmDialog: () => Promise<void>;
    getCurrentDialog: () => Dialog | null;
};

export { }
