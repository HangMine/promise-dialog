import { useContext } from 'react';
import { TtModal } from 'tt-components';

import { Dialog, DialogContext } from './Dialog';
import { DialogFC, ModalProps } from './types';

export function useDialog() {
  // 调用useDialog所关联的dialog实例
  const currentDialog = useContext(DialogContext);

  const dialog = Dialog.open;

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

  // TODO: 接入TtModal.warning：
  // 1、应该接入TtConfirm，需要TtComponents暴露
  // 2、会丢失上下文
  async function confirmDialog(...args: Parameters<typeof TtModal.warning>) {
    return new Promise((resolve) => {
      const [props, ...restArgs] = args;
      const overrideProps: typeof props = {
        ...props,
        onOk(...args) {
          props.onOk?.(...args);
          resolve({ args }); // resolve只能传递一个参数，所以这里先这样包装
        },
      };
      TtModal.warning(overrideProps, ...restArgs);
    });
  }

  // 获取当前dialog，如果操作其它dialog，可配合Dialog.dialogs使用
  function getCurrentDialog() {
    return currentDialog;
  }

  return {
    dialog,
    onConfirm,
    confirm,
    onCancel,
    cancel,
    confirmDialog,
    getCurrentDialog,
  };
}
