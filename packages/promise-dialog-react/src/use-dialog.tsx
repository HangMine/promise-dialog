import { useContext } from 'react'

import { Dialog, DialogContext } from './Dialog'
import { ComponentProps, DialogFC, ModalProps } from './types'

export function useDialog() {
  // 调用useDialog所关联的dialog实例
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
    confirmDialog,
    getCurrentDialog
  }
}
