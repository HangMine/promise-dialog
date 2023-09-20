import { useReducer } from 'react';

import { Dialog } from './Dialog';

export type DialogStore = {
  dialogs: Dialog[];
  showDialogs: Dialog[];
};

export type DialogAction = { type: string; payload?: any };

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

export function useDialogReducer() {
  const dialogStore = {
    dialogs: [] as Dialog[],
    showDialogs: [] as Dialog[],
  };
  function reducer(state: DialogStore, action: DialogAction): DialogStore {
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
  const [store, dispatch] = useReducer(reducer, dialogStore);
  return [store, dispatch] as const;
}
