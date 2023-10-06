import type { Ref } from 'vue';
import { Dialog } from './Dialog';
export type DialogStore = Ref<{
    dialogs: Dialog[];
    showDialogs: Dialog[];
}>;
export type DialogAction = {
    type: string;
    payload?: any;
};
export type DialogDispatch = (action: DialogAction) => void;
export declare const dialogActions: {
    pushDialog: (dialog: Dialog) => {
        type: string;
        payload: Dialog;
    };
    popDialog: (dialog: Dialog) => {
        type: string;
        payload: Dialog;
    };
    showDialog: (dialog: Dialog) => {
        type: string;
        payload: Dialog;
    };
    hideDialog: (dialog: Dialog) => {
        type: string;
        payload: Dialog;
    };
    clearDialogs: () => {
        type: string;
    };
};
export declare function useDialogReducer(): readonly [import("vue").ShallowRef<{
    dialogs: Dialog[];
    showDialogs: Dialog[];
}>, (dialogAction: DialogAction) => void];
