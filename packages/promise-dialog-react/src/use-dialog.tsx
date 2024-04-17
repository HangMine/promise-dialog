import { useMemoizedFn } from 'ahooks';
import { last } from 'lodash-es';
import { useContext } from 'react';

import { Dialog, DialogContext } from './Dialog';

export function useDialog() {
  // 调用useDialog所关联的dialog实例
  const currentDialog = useContext(DialogContext);

  const dialog = Dialog.open;

  const drawer = Dialog.openDrawer;

  function onConfirm(...args: Parameters<Dialog['onConfirm']>) {
    currentDialog?.onConfirm(...args);
  }

  function onCancel(...args: Parameters<Dialog['onCancel']>) {
    currentDialog?.onCancel(...args);
  }

  function confirm(...args: Parameters<Dialog['confirm']>) {
    currentDialog?.confirm(...args);
  }

  function cancel(...args: Parameters<Dialog['cancel']>) {
    currentDialog?.cancel(...args);
  }

  function updateModalProps(...args: Parameters<Dialog['updateModalProps']>) {
    currentDialog?.updateModalProps(...args);
  }

  function updateModalPropsAfterOpen(...args: Parameters<Dialog['updateModalProps']>) {
    currentDialog?.updateModalPropsAfterOpen(() => updateModalProps(...args));
  }

  function updateComponentProps(...args: Parameters<Dialog['updateComponentProps']>) {
    const nextDialog = getNextDialog();
    nextDialog?.updateComponentProps(...args);
  }

  function update(...args: Parameters<Dialog['update']>) {
    const nextDialog = getNextDialog();
    nextDialog?.update(...args);
  }

  // 会丢失上下文
  async function confirmDialog() {
    // 业务的确认弹窗
  }

  // 从上下文获取当前dialog，如果操作其它dialog，可配合Dialog.dialogs使用
  function getCurrentDialog() {
    return currentDialog;
  }

  // 从store获取当前dialog,有个场景是：在没有弹出dialog的情况下，需要获取当前dialog(可以在delay(0)后获取)
   function getCurrentDialogFromStore() {
    return last(Dialog.store.dialogs) ?? null;
  }

  // 获取下一个dialog
  function getNextDialog() {
    const currentDialogIndex = Dialog.store.dialogs.indexOf(currentDialog!);
    const nextDialog = Dialog.store.dialogs[currentDialogIndex + 1];
    return nextDialog;
  }

  return {
    dialog,
    drawer,
    onConfirm,
    confirm,
    onCancel,
    cancel,
    updateModalProps: useMemoizedFn(updateModalProps),
    updateModalPropsAfterOpen: useMemoizedFn(updateModalPropsAfterOpen),
    updateComponentProps: useMemoizedFn(updateComponentProps),
    update: useMemoizedFn(update),
    confirmDialog,
    getCurrentDialog,
    getCurrentDialogFromStore,
  };
}