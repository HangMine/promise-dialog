# 引入模态框

## 根据不同UI框架传递适配器

### ant design >=5（默认）
```tsx 
import { DialogProvider } from 'promise-dialog-react'
import { Modal } from 'ant-design'

  <DialogProvider :ModalComponent="Modal">
    <App />
  </DialogProvider>
```

### ant design <5
```tsx 
import { DialogProvider, antdController } from 'promise-dialog-react'
import { Modal } from 'ant-design'

<template>
  <DialogProvider :ModalComponent="Modal" :modalControllerAdapter="antdController">
    <App />
  </DialogProvider>
</template>
```

### arco design
```tsx 
import { DialogProvider, antdController } from 'promise-dialog-react'
import { Modal } from '@arco-design/web-react'

<template>
  <DialogProvider :ModalComponent="Modal" :modalControllerAdapter="antdController">
    <App />
  </DialogProvider>
</template>
```

### 自定义模态框组件
::: tip
Promise Dialog的控制器类型如下，只要按下面属性接入自定义模态框组件即可
:::
```ts
type DialogController = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  afterClose: () => void;
};
```

```tsx 
import { DialogProvider, type DialogController } from 'promise-dialog-react'
import { DiyModal } from 'DiyModal'

function diyController(dialogController:DialogController){
  const { visible, onOk, onCancel, afterClose } = dialogController;

  return {
    diyVisible: visible,
    diyOnOk: onOk,
    diyOnCancel: onCancel,
    diyAfterClose: afterClose,
  }
}

  <DialogProvider :ModalComponent="DiyModal" :modalControllerAdapter="diyController">
    <App />
  </DialogProvider>
```


