import { AllowedComponentProps } from 'vue';
import { Component } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { JSX as JSX_2 } from 'vue/jsx-runtime';
import { PropType } from 'vue';
import { VNode } from 'vue';
import { VNodeProps } from 'vue';

export declare function antdController(dialogController: DialogController): DialogController;

export declare function antdModalAdvancedController(dialogController: DialogController): {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    afterClose: () => void;
};

export declare function arcoDesignController(dialogController: DialogController): DialogController;

export declare interface ComponentProps {
    [key: string]: unknown;
}

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

declare type DialogAction = {
    type: string;
    payload?: any;
};

export declare const DialogContext: unique symbol;

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

declare type DialogDispatch = (action: DialogAction) => void;

export declare const DialogProvider: DefineComponent<{
    ModalComponent: {
        type: PropType<UnknownComponent | Component>;
        required: true;
    };
    modalControllerAdapter: {
        type: PropType<ModalControllerAdapter>;
    };
}, () => JSX_2.Element, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    ModalComponent: {
        type: PropType<UnknownComponent | Component>;
        required: true;
    };
    modalControllerAdapter: {
        type: PropType<ModalControllerAdapter>;
    };
}>>, {}, {}>;

export declare type ModalControllerAdapter = typeof antdModalAdvancedController | typeof antdController | typeof arcoDesignController | ((dialogController: DialogController) => Record<string, unknown>);

export declare interface ModalProps {
    [key: string]: unknown;
}

export declare type UnknownComponent<P extends ComponentProps = any> = DefineComponent<P, any, any>;

export declare function useDialog(): {
    dialog: typeof Dialog.open;
    onConfirm: (callback: ((dialog: Dialog) => void) | undefined) => void;
    confirm: (resolveResult?: unknown) => void;
    onCancel: (callback: ((dialog: Dialog) => void) | undefined) => void;
    cancel: (resolveResult?: unknown) => void;
    getCurrentDialog: () => Dialog | undefined;
};

export { }
