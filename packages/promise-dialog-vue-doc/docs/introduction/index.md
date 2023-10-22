introduction

# 什么是promise-dialog

## 特点
##### 函数式调用
##### promise管理弹窗流程
##### 包含上下文

## 示例
<DialogProvider :ModalComponent="Modal">
  <Demo1View />
</DialogProvider>

<script setup>
import { Modal } from 'ant-design-vue'
import { DialogProvider } from 'promise-dialog-vue'
import Demo1View from '../../src/views/Demo1View.vue'
</script>