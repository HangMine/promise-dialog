<template>
  <div>
    <button @click="openTest1ByComponent">传组件+默认footer</button>
    <button @click="openTest1ByVnode">传VNode+默认footer</button>
    <button @click="openTest2ByComponentWithDialogify">传组件+dialogify</button>
    <button @click="openTest2ByComponentWithDIYFooter">传组件+自定义footer</button>
  </div>
</template>
<script setup lang="ts">
import { useDialog } from 'promise-dialog-vue'
import Test1View from './Test1View.vue'
import Test2View from './Test2View.vue';
import { createVNode } from 'vue';

const { dialog } = useDialog()
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  console.log('test1 resutl:', result)
}
async function openTest1ByVnode(){
  const result = await dialog(createVNode(Test1View))
  console.log('test1 resutl:', result)
}
async function openTest2ByComponentWithDialogify(){
  const result = await dialog(Test2View)
  console.log('test1 resut2:', result)
}

async function openTest2ByComponentWithDIYFooter(){
  const result = await dialog(Test2View,{},{footer:null})
  console.log('test1 resut2:', result)
}
</script>
<style></style>
