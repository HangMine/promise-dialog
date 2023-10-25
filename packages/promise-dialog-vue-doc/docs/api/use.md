
# 使用

## 传组件
<DialogProvider :ModalComponent="Modal">
        <button @click="openTest1ByComponent">传组件+默认footer</button>
</DialogProvider>

```ts
// 传组件+默认footer
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  // result为点击确认的结果
  console.log('test1 resutl:', result)
}
```

## 传Vnode
<DialogProvider :ModalComponent="Modal">
      <button @click="openTest1ByVnode">传VNode+默认footer</button>
</DialogProvider>

```ts
// 传VNode+默认footer
async function openTest1ByVnode() {
  const result = await dialog(createVNode(Test1View))
  console.log('test1 resutl:', result)
}
```

## 自定义foolter
<DialogProvider :ModalComponent="Modal">
      <button @click="openTest2ByComponentWithDIYFooter">传组件+自定义footer</button>
</DialogProvider>

```ts
// 传组件+自定义footer
async function openTest2ByComponentWithDialogify() {
  const result = await dialog(Test2View)
  console.log('test1 resut2:', result)
}
```

## dialogify
<DialogProvider :ModalComponent="Modal">
      <button @click="openTest2ByComponentWithDialogify">传组件+dialogify</button>
</DialogProvider>

```ts
// 传组件+dialogify
async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog(Test2View, {}, { footer: null })
  console.log('test1 resut2:', result)
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

