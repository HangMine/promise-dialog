"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../node_modules/.pnpm/vue@3.3.4/node_modules/vue/dist/vue.runtime.esm-bundler.js");
const reactivity_esmBundler = require("../node_modules/.pnpm/@vue_reactivity@3.3.4/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js");
const dialogActions = {
  pushDialog: (dialog) => ({
    type: "push_dialog",
    payload: dialog
  }),
  popDialog: (dialog) => ({
    type: "pop_dialog",
    payload: dialog
  }),
  showDialog: (dialog) => ({
    type: "show_dialog",
    payload: dialog
  }),
  hideDialog: (dialog) => ({
    type: "hide_dialog",
    payload: dialog
  }),
  clearDialogs: () => ({
    type: "clear_dialogs"
  })
};
const dialogStore = reactivity_esmBundler.shallowRef({
  dialogs: [],
  showDialogs: []
});
function useDialogReducer() {
  function reducer(state, action) {
    switch (action.type) {
      case "push_dialog":
        return {
          ...state,
          dialogs: [...state.dialogs, action.payload]
        };
      case "pop_dialog":
        return {
          ...state,
          dialogs: state.dialogs.filter((d) => d !== action.payload)
        };
      case "show_dialog":
        return {
          ...state,
          showDialogs: [...state.showDialogs, action.payload]
        };
      case "hide_dialog":
        return {
          ...state,
          showDialogs: state.showDialogs.filter((d) => d !== action.payload)
        };
      case "clear_dialogs":
        return {
          ...state,
          showDialogs: []
        };
      default:
        return state;
    }
  }
  function dispatch(dialogAction) {
    dialogStore.value = reducer(dialogStore.value, dialogAction);
  }
  return [dialogStore, dispatch];
}
exports.dialogActions = dialogActions;
exports.useDialogReducer = useDialogReducer;
