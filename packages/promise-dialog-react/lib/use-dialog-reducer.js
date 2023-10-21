"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const react = require("react");
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
function useDialogReducer() {
  const dialogStore = {
    dialogs: [],
    showDialogs: []
  };
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
  const [store, dispatch] = react.useReducer(reducer, dialogStore);
  return [store, dispatch];
}
exports.dialogActions = dialogActions;
exports.useDialogReducer = useDialogReducer;
