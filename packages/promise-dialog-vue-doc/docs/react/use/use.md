
# 使用场景

## 传ReactNode
<DialogProvider :ModalComponent="Modal">
        <Button @click="openTest1ByComponent">传ReactNode+默认footer</Button>
</DialogProvider>

调用模态框
```tsx
// 传ReactNode+默认footer
  async function openTest1ByReactNode() {
    const result = await dialog(<Test1View message="这是传进来的props"></Test1View>)
    console.log('test1 resutl:', result)
  }
```

模态框内组件:Test1View

<<< ../../../../promise-dialog-react-doc/src/views/Test1View.tsx

## 传组件
<Button @click="openTest1ByVnode">传组件+默认footer</Button>

调用模态框
```ts
// 传组件+默认footer
  async function openTest1ByComponent() {
    const result = await dialog(Test1View, { message: '这是传进来的props' })
    console.log('test1 resutl:', result)
  }
```

## 自定义footer
<Button @click="openTest2ByComponentWithDIYFooter">传ReactNode+自定义footer</Button>

调用模态框
```ts
// 传ReactNode+自定义footer
  async function openTest2ReactNodeWithDIYFooter() {
    const result = await dialog(<Test2View></Test2View>, { footer: null })
    console.log('test2 result:', result)
  }
```

模态框内组件:Test2View

<<< ../../../../promise-dialog-react-doc/src/views/Test2View.tsx

## dialogify
通过对**组件**设置dialogify属性，来设置该组件**被模态框调起时的默认模态框props**
::: tip
dialogify可以通过dialog的模态框参数进行覆盖
:::
<Button @click="openTest2ByComponentWithDialogify">传ReactNode+dialogify</Button>

调用模态框
```ts
// 传组件+dialogify
  async function openTest2ByReactNodeWithDialogify() {
    const result = await dialog(<Test2View></Test2View>)
    console.log('test2 result:', result)
  }
```

TestView2组件增加dialogify配置

<<< ../../../../promise-dialog-react-doc/src/views/Test2View.tsx{30-33}

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
  console.log('test2 result:', result)
}

async function openTest2ByComponentWithDIYFooter() {
  const result = await dialog<number>(Test2View, {}, { footer: null })
  console.log('test2 result:', result)
}
</script>

