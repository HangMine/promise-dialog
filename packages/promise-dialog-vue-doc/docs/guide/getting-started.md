
# 快速上手

## 安装
在应用外围包裹一次即可全局生效

### vue
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

### react
```tsx 
import { DialogProvider } from 'promise-dialog-react'
import { Modal } from 'ant-design'

<DialogProvider :ModalComponent="Modal">
  <App />
</DialogProvider>
```

## 最简单使用
<DialogProvider :ModalComponent="Modal">
   <ul>
    <li>
      <div>
        <button @click="openTest1ByComponent">传组件+默认footer</button>
      </div>
    </li>
  </ul>
</DialogProvider>

### vue
```ts
import { useDialog } from 'promise-dialog-vue'
import Test1View from './Test1View.vue'

const { dialog } = useDialog()

// 传组件+默认footer
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  // result为点击确认的结果
  console.log('test1 resutl:', result)
}
```

### react
```ts
import { useDialog } from 'promise-dialog-react'
import Test1View from './Test1View'

const { dialog } = useDialog()

// 传组件+默认footer
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  // result为点击确认的结果
  console.log('test1 resutl:', result)
}
```

<script setup>
import { createVNode } from 'vue'
import { Modal,Tabs,TabPane } from 'ant-design-vue'
import { DialogProvider } from 'promise-dialog-vue'
import Demo1View from '../../src/views/Demo1View.vue'
import Test1View from '../../src/views/Test1View.vue'
import Test2View from '../../src/views/Test2View.vue'
import { useDialog } from 'promise-dialog-vue'

const { dialog } = useDialog()
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  console.log('test1 resutl:', result)
}
async function openTest1ByVnode() {
  const result = await dialog(createVNode(Test1View))
  console.log('test1 resutl:', result)
}
async function openTest2ByComponentWithDialogify() {
  const result = await dialog(Test2View)
  console.log('test1 resut2:', result)
}

async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog(Test2View, {}, { footer: null })
  console.log('test1 resut2:', result)
}
</script>

