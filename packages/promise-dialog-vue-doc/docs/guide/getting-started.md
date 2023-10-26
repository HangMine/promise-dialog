
# 快速上手

## vue

### 安装
```shell
# NPM
$ npm install promise-dialog-vue --save

# Yarn
$ yarn add promise-dialog-vue

# pnpm
$ pnpm install promise-dialog-vue
```
### 引入包裹组件
在应用外围包裹一次即可全局生效
::: tip
默认适配ant-design-vue >=4的UI框架，点击这里[适配其它框架](/api/setup)
:::
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
### 最简单使用
<DialogProvider :ModalComponent="Modal">
   <Button @click="openTest1ByComponent">传组件+默认footer</Button>
</DialogProvider>

调用弹窗
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
弹窗内组件:Test1View
```vue
<template>
  <div class="">
    Test1:count {{ count }}
    <button @click="() => count++">add count</button>
  </div>
</template>

<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue'
import { ref } from 'vue'

const { onConfirm } = useDialog()
const count = ref(0)

onConfirm(({ confirm }) => {
  confirm(count.value)
})
</script>
<style scpoed>
/* @import url() */
</style>
```

## react

### 安装
```shell
# NPM
$ npm install promise-dialog-react --save

# Yarn
$ yarn add promise-dialog-react

# pnpm
$ pnpm install promise-dialog-react
```
### 引入包裹组件
在应用外围包裹一次即可全局生效
::: tip
默认适配ant-design >=5的UI框架，点击这里[适配其它框架](/api/setup)
:::
```tsx 
import { DialogProvider } from 'promise-dialog-react'
import { Modal } from 'ant-design'

<DialogProvider :ModalComponent="Modal">
  <App />
</DialogProvider>
```
### 最简单使用
<DialogProvider :ModalComponent="Modal">
   <Button @click="openTest1ByComponent">传组件+默认footer</Button>
</DialogProvider>

调用弹窗
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
弹窗内组件:Test1View
```tsx
import React from 'react'
import { useDialog } from 'promise-dialog-react'

interface Props {
  message?: string
}

const Test1View = (props: Props) => {
  const { message = 'default message' } = props
  const { onConfirm } = useDialog()
  const [count, setCount] = React.useState(0)

  onConfirm(({ confirm }) => {
    confirm(count)
  })

  return (
    <div className="">
      <div>props message: {message}</div>
      Test1:count {count}
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
  )
}

export default Test1View
```

<script setup>
import { createVNode } from 'vue'
import { Modal,Tabs,TabPane,Button } from 'ant-design-vue'
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

