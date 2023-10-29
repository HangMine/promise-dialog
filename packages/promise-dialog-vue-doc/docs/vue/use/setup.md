# 引入模态框

## 根据不同UI框架传递适配器

### ant design vue >=4（默认）
```vue 
<script setup lang="ts">
import { DialogProvider } from 'promise-dialog-vue'
import { Modal } from 'ant-design-vue'
</script>

<template>
  <DialogProvider :ModalComponent="Modal">
    <App />
  </DialogProvider>
</template>
```

### ant design vue <4
```vue 
<script setup lang="ts">
import { DialogProvider, antdController } from 'promise-dialog-vue'
import { Modal } from 'ant-design-vue'
</script>

<template>
  <DialogProvider :ModalComponent="Modal" :modalControllerAdapter="antdController">
    <App />
  </DialogProvider>
</template>
```

### arco design
```vue 
<script setup lang="ts">
import { DialogProvider, antdController } from 'promise-dialog-vue's
import { Modal } from '@arco-design/web-vue'
</script>

<template>
  <DialogProvider :ModalComponent="Modal" :modalControllerAdapter="antdController">
    <App />
  </DialogProvider>
</template>
```

### element plus
::: tip
element plus的ElDialog并没有自带 **确认** 按钮和**取消** 按钮  
如果开发者二次封装footer的话，通过 **onOk** 和 **onCancel** 的事件抛出即可接入promise-dialog
:::
```vue 
<script setup lang="ts">
import { DialogProvider, elementPlusController } from 'promise-dialog-vue'
import { ElDialog } from 'element-plus'
</script>

<template>
  <DialogProvider :ModalComponent="Modal" :modalControllerAdapter="elementPlusController">
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

```vue 
<script setup lang="ts">
import { DialogProvider, type DialogController } from 'promise-dialog-vue'
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

</script>

<template>
  <DialogProvider :ModalComponent="DiyModal" :modalControllerAdapter="diyController">
    <App />
  </DialogProvider>
</template>
```


