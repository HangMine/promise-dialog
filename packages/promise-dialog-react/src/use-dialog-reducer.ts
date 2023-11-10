import { useReducer } from 'react';

import { Dialog } from './Dialog';
import { ComponentProps } from '.';

export type DialogStore = {
  dialogs: Dialog[];
  showDialogs: Dialog[];
  injectComponentPropsMap: Record<Dialog['id'], ComponentProps>
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
  updateComponentProps: (dialog: Dialog, props: ComponentProps) => ({
    type: 'update_component_props',
    payload: {
      dialog,
      props
    },
  }),
  removeInjectComponentProps: (dialog: Dialog) => ({
    type: 'remove_inject_component_props',
    payload: dialog,
  }),

};

export function useDialogReducer() {
  const dialogStore = {
    dialogs: [] as Dialog[],
    showDialogs: [] as Dialog[],
    injectComponentPropsMap: {} as DialogStore['injectComponentPropsMap']
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
      case 'update_component_props':
        return {
          ...state,
          injectComponentPropsMap: {
            ...state.injectComponentPropsMap,
            [action.payload.dialog.id]: action.payload.props
          },
        };
      case 'remove_inject_component_props': {
        const { [action.payload.id]: _, ...injectComponentPropsMap } = state.injectComponentPropsMap;
        return {
          ...state,
          injectComponentPropsMap,
        };
      }


      default:
        return state;
    }
  }
  const [store, dispatch] = useReducer(reducer, dialogStore);
  return [store, dispatch] as const;
}
