# useDialog
使用Promise Dialog时需要引入的hook，包含以下方法或者属性

## dialog
弹出模态框，可以传组件或者VNode

传组件时：第一个参数为组件，第二个参数为组件props，第三个参数为模态框props

传VNode时：第一个参数为VNode，第二个参数为模态框props

#### 类型
```ts
dialog<R, T extends UnknownComponent<P> | VNode = any, P extends ComponentProps = any>(ComponentOrVnode: UnknownComponent<P> | VNode, ComponentPropsOrModalProps?: T extends VNode ? ModalProps : P, modalProps?: ModalProps): Promise<R>;
```

#### 示例
```ts
// 传组件
const { dialog } = useDialog()
async function openTest1ByComponent() {
  const result = await dialog(Test1View)
  console.log('test1 resutl:', result)
}

// 传VNode
async function openTest1ByVnode() {
  // const result = await dialog(createVNode(Test1View))
  const result = await dialog(<Test1View></Test1View>)
  console.log('test1 resutl:', result)
}
```


## onConfirm
使用模态框默认footer时，点击确认的勾子
#### 类型
```ts
onConfirm: (callback: ((dialog: Dialog) => void) | undefined) => void;
```

#### 示例
```ts
// 模态框内部组件使用
const { onConfirm, confirm } = useDialog()
const count = ref(0)

onConfirm(() => {
  confirm(count.value)
})
```

## onCancel
使用模态框默认footer时，点击取消的勾子
#### 类型
```ts
onCancel: (callback: ((dialog: Dialog) => void) | undefined) => void;
```

#### 示例
```ts
// 模态框内部组件使用
const { onCancel, cancel } = useDialog()
const count = ref(0)

onCancel(() => {
  cancel(count.value)
})
```

## confirm
使用自定义footer时，点击确认的勾子
#### 类型
```ts
confirm: (resolveResult?: unknown) => void;
```

#### 示例
```vue
<template>
  <div>
    Test2:count {{ count }}
    <button @click="() => count++">add count</button>
    <footer class="flex items-end">
      <button @click="diyOnConfrim">确认</button>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue'
import { ref } from 'vue'

const { onConfirm, confirm, cancel } = useDialog()
const count = ref(0)

function diyOnConfrim() {
  confirm(count.value)
}
</script>
```

## cancel
使用自定义footer时，点击取消的勾子
#### 类型
```ts
cancel: (rejectResult?: unknown) => void;
```

#### 示例
```vue
<template>
  <div>
    Test2:count {{ count }}
    <button @click="() => count++">add count</button>
    <footer class="flex items-end">
      <button @click="diyOnCancel">取消</button>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { useDialog } from 'promise-dialog-vue'
import { ref } from 'vue'

const { onConfirm, confirm, cancel } = useDialog()
const count = ref(0)

function diyOnCancel() {
  cancel(count.value)
}
</script>
```

## currentDialog
当前的Dialog实例，参考[Dialog章节](./DialogApi)
