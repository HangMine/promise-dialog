<template>
  <div>
    <button @click="openTest1ByComponent">通过组件打开弹窗</button>
  </div>
</template>
<script setup lang="ts">
import { useDialog } from 'promise-dialog-vue'
import Test1View from './Test1View.vue'

const { dialog } = useDialog()
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  console.log('test1 resutl:', result)
}
</script>
<style></style>
