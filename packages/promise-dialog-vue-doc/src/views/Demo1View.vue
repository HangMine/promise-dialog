<template>
  <ul>
    <li>
      <button @click="openTest1ByComponent">传组件+默认footer</button>
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
</template>
<script setup lang="tsx">
import { useDialog } from 'promise-dialog-vue'
import Test1View from './Test1View.vue'
import Test2View from './Test2View.vue'
import { createVNode } from 'vue'

const { dialog } = useDialog()
async function openTest1ByComponent() {
  const result = await dialog<number>(Test1View, { message: '这是传进来的props' })
  console.log('test1 resutl:', result)
}
async function openTest1ByVnode() {
  // jsx
  const result = await dialog<number>(<Test1View message="这是传进来的props"></Test1View>)
  // createVNode
  // const result = await dialog<number>(createVNode(Test1View, { message: '这是传进来的props' }))
  console.log('test1 resutl:', result)
}
async function openTest2ByComponentWithDialogify() {
  const result = await dialog(Test2View)
  console.log('test2 result:', result)
}

async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog(Test2View, {}, { footer: null })
  console.log('test2 result:', result)
}
</script>
<style></style>
