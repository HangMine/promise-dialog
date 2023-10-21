<template>
  <div>
    Test2:count {{ count }}
    <button @click="() => count++">add count</button>
    <footer class="flex items-end">
      <button @click="diyOnConfrim">确认</button>
      <button @click="diyOnCancel">取消</button>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  dialogify: {
    title: '测试标题',
    width: 1280
  }
}
</script>

<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue'
import { ref } from 'vue'

const { onConfirm, confirm, cancel } = useDialog()
const count = ref(0)

onConfirm(() => {
  confirm(count.value)
})

function diyOnConfrim() {
  confirm(count.value)
}

function diyOnCancel() {
  cancel()
}
</script>
<style scpoed>
/* @import url() */
</style>
