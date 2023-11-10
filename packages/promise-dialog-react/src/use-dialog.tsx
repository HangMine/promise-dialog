import { useContext } from 'react'

import { Dialog, DialogContext } from './Dialog'
import { ComponentProps, DialogFC, ModalProps } from './types'
import { last } from 'lodash-es'

export function useDialog() {
  // 调用useDialog所关联的Dialog
  const currentDialog = useContext(DialogContext)

  const dialog = Dialog.open

  function onConfirm(...args: Parameters<Dialog['onConfirm']>) {
    currentDialog?.onConfirm(...args)
  }

  function onCancel(...args: Parameters<Dialog['onCancel']>) {
    currentDialog?.onCancel(...args)
  }

  function confirm(...args: Parameters<Dialog['confirm']>) {
    currentDialog?.confirm(...args)
  }

  function cancel(...args: Parameters<Dialog['cancel']>) {
    currentDialog?.cancel(...args)
  }

  async function confirmDialog() {
    // TODO:
  }

  function updateComponentProps(...args: Parameters<Dialog['updateComponentProps']>) {
    const currentDialogIndex = Dialog.store.dialogs.indexOf(currentDialog!)
    const nextDialog = Dialog.store.dialogs[currentDialogIndex + 1]
    nextDialog?.updateComponentProps(...args)
  }

  // 获取当前dialog，如果操作其它dialog，可配合Dialog.dialogs使用
  function getCurrentDialog() {
    return currentDialog
  }

  return {
    dialog,
    onConfirm,
    confirm,
    onCancel,
    cancel,
    updateComponentProps,
    confirmDialog,
    getCurrentDialog
  }
}
