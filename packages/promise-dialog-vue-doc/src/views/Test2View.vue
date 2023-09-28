<template>
  <div>
    Test2:count {{ count }}
    <button @click="() => count++">add count</button>
    <footer class="flex items-end">
      <button @click="onConfrim">确认</button>
      <button @click="onCancel">取消</button>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  dialogify:{
    title:'测试标题',
    width:1280
  }
}
</script>

<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue'
import { ref } from 'vue'

const { confirm,cancel } = useDialog()
const count = ref(0)

function onConfrim(){
  confirm(count.value)
}

function onCancel(){
  cancel()
}
</script>
<style scpoed>
/* @import url() */
</style>
