<template>
  <div class="">
    Test1:count {{ count }}
    <button @click="() => count++">add count</button>
  </div>
</template>

<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue'
import { ref } from 'vue'

const { onConfirm, confirm } = useDialog()
const count = ref(0)

onConfirm(() => {
  confirm(count.value)
})
</script>
<style scpoed>
/* @import url() */
</style>
