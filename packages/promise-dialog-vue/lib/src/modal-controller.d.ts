export type DialogController = {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    afterClose: () => void;
};
export type ModalControllerAdapter = typeof antdModalAdvancedController | typeof antdController | typeof arcoDesignController | ((dialogController: DialogController) => Record<string, unknown>);
export declare function antdModalAdvancedController(dialogController: DialogController): {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    afterClose: () => void;
};
export declare function antdController(dialogController: DialogController): DialogController;
export declare function arcoDesignController(dialogController: DialogController): DialogController;
export declare function dialogController2ModalController(dialogController: DialogController, adapter: ModalControllerAdapter): DialogController | Record<string, unknown> | {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    afterClose: () => void;
};
