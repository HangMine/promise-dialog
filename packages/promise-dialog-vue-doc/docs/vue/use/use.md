
# 使用场景

## 传组件
<DialogProvider :ModalComponent="Modal">
        <Button @click="openTest1ByComponent">传组件+默认footer</Button>
</DialogProvider>

调用模态框
```ts
// 传组件+默认footer
async function openTest1ByComponent() {
  const result = await dialog<number>(Test1View)
  // result为点击确认的结果
  console.log('test1 resutl:', result)
}
```

模态框内组件:Test1View

<<< ../../../src/views/Test1View.vue

## 传Vnode
<DialogProvider :ModalComponent="Modal">
      <Button @click="openTest1ByVnode">传VNode+默认footer</Button>
</DialogProvider>

调用模态框
```ts
// 传VNode+默认footer
async function openTest1ByVnode() {

  // jsx
  const result = await dialog<number>(<Test1View></Test1View>)
  // createVNode
  // const result = await dialog<number>(createVNode(Test1View))
  console.log('test1 resutl:', result)
}
```

## 自定义footer
<DialogProvider :ModalComponent="Modal">
      <Button @click="openTest2ByComponentWithDIYFooter">传组件+自定义footer</Button>
</DialogProvider>

调用模态框
```ts
// 传组件+自定义footer
async function openTest2ByComponentWithDialogify() {
  const result = await dialog<number>(Test2View)
  console.log('test1 resut2:', result)
}
```

模态框内组件:Test2View

<<< ../../../src/views/Test2View.vue

## dialogify
通过对**组件**设置dialogify属性，来设置该组件**被模态框调起时的默认模态框props**
::: tip
dialogify可以通过dialog的模态框参数进行覆盖
:::
<DialogProvider :ModalComponent="Modal">
      <Button @click="openTest2ByComponentWithDialogify">传组件+dialogify</Button>
</DialogProvider>

调用模态框
```ts
// 传组件+dialogify
async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog<number>(Test2View, {}, { footer: null })
  // 模态框props覆盖
  // const result = await dialog<number>(Test2View, {title:'我是覆盖的标题'}, { footer: null })
  console.log('test1 resut2:', result)
}
```

TestView2组件增加dialogify配置

<<< ../../../src/views/Test2View.vue{12-19}


<script lang="ts" setup>
import { createVNode } from 'vue'
import { Modal,Tabs,TabPane,Button } from 'ant-design-vue'
import { DialogProvider } from 'promise-dialog-vue'
import Demo1View from '../../../src/views/Demo1View.vue'
import Test1View from '../../../src/views/Test1View.vue'
import Test2View from '../../../src/views/Test2View.vue'
import { useDialog } from 'promise-dialog-vue'

const { dialog } = useDialog()
async function openTest1ByComponent() {
  const result = await dialog<number>(Test1View)
  console.log('test1 resutl:', result)
}
async function openTest1ByVnode() {
  const result = await dialog<number>(createVNode(Test1View))
  console.log('test1 resutl:', result)
}
async function openTest2ByComponentWithDialogify() {
  const result = await dialog<number>(Test2View)
  console.log('test1 resut2:', result)
}

async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog<number>(Test2View, {}, { footer: null })
  console.log('test1 resut2:', result)
}
</script>

