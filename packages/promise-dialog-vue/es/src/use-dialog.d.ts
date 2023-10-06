import { Dialog } from './Dialog';
export declare function useDialog(): {
    dialog: typeof Dialog.open;
    onConfirm: (callback: ((dialog: Dialog) => void) | undefined) => void;
    confirm: (resolveResult?: unknown) => void;
    onCancel: (callback: ((dialog: Dialog) => void) | undefined) => void;
    cancel: (resolveResult?: unknown) => void;
    getCurrentDialog: () => Dialog | undefined;
};
