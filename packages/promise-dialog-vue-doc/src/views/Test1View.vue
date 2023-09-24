<template>
  <div class="">
    Test1
  </div>
</template>

<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue';


const { onConfirm } = useDialog()

onConfirm(({ confirm }) => {
  confirm('test1 confirm')
})
</script>
<style scpoed>
/* @import url() */
</style>
