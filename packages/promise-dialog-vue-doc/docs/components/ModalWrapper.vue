<template>
  <DialogProvider :ModalComponent="Modal">
    <slot></slot>
  </DialogProvider>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue'
</script>
<style scpoed>
/* @import url() */
</style>
