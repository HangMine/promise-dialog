---
title: getting-started
prev:
  text: '简介'
  link: '/introduction/'
next: false
---

# 快速上手

## 安装
在应用外围包裹一次即可全局生效
```ts
import { DialogProvider } from 'promise-dialog-vue'
import { Modal } from 'ant-design-vue'
```

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

## 使用
<DialogProvider :ModalComponent="Modal">
   <ul>
    <li>
      <div>
        <button @click="openTest1ByComponent">传组件+默认footer</button>
      </div>
    </li>
    <li>
      <button @click="openTest1ByVnode">传VNode+默认footer</button>
    </li>
    <li>
      <button @click="openTest2ByComponentWithDIYFooter">传组件+自定义footer</button>
    </li>
    <li>
      <button @click="openTest2ByComponentWithDialogify">传组件+dialogify</button>
    </li>
  </ul>
</DialogProvider>


```ts
import { useDialog } from 'promise-dialog-vue'
import Test1View from './Test1View.vue'
import Test2View from './Test2View.vue'
import { createVNode } from 'vue'

const { dialog } = useDialog()

// 传组件+默认footer
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  // result为点击确认的结果
  console.log('test1 resutl:', result)
}

// 传VNode+默认footer
async function openTest1ByVnode() {
  const result = await dialog(createVNode(Test1View))
  console.log('test1 resutl:', result)
}

// 传组件+自定义footer
async function openTest2ByComponentWithDialogify() {
  const result = await dialog(Test2View)
  console.log('test1 resut2:', result)
}

// 传组件+dialogify
async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog(Test2View, {}, { footer: null })
  console.log('test1 resut2:', result)
}
```

<script setup>
import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
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

