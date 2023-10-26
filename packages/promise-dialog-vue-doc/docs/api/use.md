
# 使用

## 传组件
<DialogProvider :ModalComponent="Modal">
        <Button @click="openTest1ByComponent">传组件+默认footer</Button>
</DialogProvider>

调用弹窗
```ts
// 传组件+默认footer
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  // result为点击确认的结果
  console.log('test1 resutl:', result)
}
```

弹窗内组件:Test1View
```vue
<template>
  <div class="">
    Test1:count {{ count }}
    <button @click="() => count++">add count</button>
  </div>
</template>

<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue'
import { ref } from 'vue'

const { onConfirm } = useDialog()
const count = ref(0)

onConfirm(({ confirm }) => {
  confirm(count.value)
})
</script>
<style scpoed>
/* @import url() */
</style>
```

## 传Vnode
<DialogProvider :ModalComponent="Modal">
      <Button @click="openTest1ByVnode">传VNode+默认footer</Button>
</DialogProvider>

调用弹窗
```ts
// 传VNode+默认footer
async function openTest1ByVnode() {

  // jsx
  const result = await dialog(<Test1View></Test1View>)
  // createVNode
  // const result = await dialog(createVNode(Test1View))
  console.log('test1 resutl:', result)
}
```

## 自定义footer
<DialogProvider :ModalComponent="Modal">
      <Button @click="openTest2ByComponentWithDIYFooter">传组件+自定义footer</Button>
</DialogProvider>

调用弹窗
```ts
// 传组件+自定义footer
async function openTest2ByComponentWithDialogify() {
  const result = await dialog(Test2View)
  console.log('test1 resut2:', result)
}
```

弹窗内组件:Test2View
```vue
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

```

## dialogify
<DialogProvider :ModalComponent="Modal">
      <Button @click="openTest2ByComponentWithDialogify">传组件+dialogify</Button>
</DialogProvider>

调用弹窗
```ts
// 传组件+dialogify
async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog(Test2View, {}, { footer: null })
  console.log('test1 resut2:', result)
}
```

TestView2组件增加dialogify配置
```vue{12-19}
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

```


<script setup>
import { createVNode } from 'vue'
import { Modal,Tabs,TabPane,Button } from 'ant-design-vue'
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

