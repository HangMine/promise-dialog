import { reactive, Ref, ref, shallowRef, UnwrapRef } from 'vue';
import { Dialog } from './Dialog';

export type DialogStore = Ref<{
  dialogs: Dialog[];
  showDialogs: Dialog[];
}>;

export type DialogAction = { type: string; payload?: any };
export type DialogDispatch = (action: DialogAction) => void;

export const dialogActions = {
  pushDialog: (dialog: Dialog) => ({
    type: 'push_dialog',
    payload: dialog,
  }),
  popDialog: (dialog: Dialog) => ({
    type: 'pop_dialog',
    payload: dialog,
  }),
  showDialog: (dialog: Dialog) => ({
    type: 'show_dialog',
    payload: dialog,
  }),
  hideDialog: (dialog: Dialog) => ({
    type: 'hide_dialog',
    payload: dialog,
  }),
  clearDialogs: () => ({
    type: 'clear_dialogs',
  }),
};
const dialogStore = shallowRef({
  dialogs: [] as Dialog[],
  showDialogs: [] as Dialog[],
});
export function useDialogReducer() {
  function reducer(state: UnwrapRef<DialogStore>, action: DialogAction): UnwrapRef<DialogStore> {
    switch (action.type) {
      case 'push_dialog':
        return {
          ...state,
          dialogs: [...state.dialogs, action.payload],
        };
      case 'pop_dialog':
        return {
          ...state,
          dialogs: state.dialogs.filter((d) => d !== action.payload),
        };
      case 'show_dialog':
        return {
          ...state,
          showDialogs: [...state.showDialogs, action.payload],
        };
      case 'hide_dialog':
        return {
          ...state,
          showDialogs: state.showDialogs.filter((d) => d !== action.payload),
        };
      case 'clear_dialogs':
        return {
          ...state,
          showDialogs: [],
        };
      default:
        return state;
    }
  }
  function dispatch(dialogAction: DialogAction) {
    dialogStore.value = reducer(dialogStore.value, dialogAction);
  }
  return [dialogStore, dispatch] as const;
}
