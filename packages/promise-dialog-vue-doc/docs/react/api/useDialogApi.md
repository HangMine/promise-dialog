# useDialog
使用Promise Dialog时需要引入的hook，包含以下方法或者属性

## dialog
弹出模态框，可以传ReactNode或者组件

传ReactNode时：第一个参数为ReactNode，第二个参数为模态框props

传组件时：第一个参数为组件，第二个参数为组件props，第三个参数为模态框props

#### 类型
```ts
dialog<R, T = DialogFC | React.ReactNode>(ReactNodeOrComponent: T, componentPropsOrModalProps?: T extends DialogFC<infer P> ? P : ModalProps, modalProps?: ModalProps): Promise<R>;

```

#### 示例
```ts
// 传ReactNode
  async function openTest1ByReactNode() {
    const result = await dialog(<Test1View message="这是传进来的props"></Test1View>)
    console.log('test1 resutl:', result)
  }

// 传组件
  async function openTest1ByComponent() {
    const result = await dialog(Test1View, { message: '这是传进来的props' })
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
const [count, setCount] = React.useState(0)

onConfirm(() => {
  confirm(count)
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
const [count, setCount] = React.useState(0)

onCancel(() => {
  cancel(count)
})
```

## confirm
使用自定义footer时，点击确认的勾子
#### 类型
```ts
confirm: (resolveResult?: unknown) => void;
```

#### 示例
```tsx
import React from 'react'
import { useDialog } from 'promise-dialog-react'

const Test1View = () => {
  const { confirm } = useDialog()
  const [count, setCount] = React.useState(0)

  function diyOnConfrim() {
    confirm(count)
  }

  return (
    <div className="">
      Test1:count {count}
      <button onClick={() => setCount(count + 1)}>add count</button>
      <button onClick={diyOnConfrim}>确认</button>
    </div>
  )
}
```

## cancel
使用自定义footer时，点击取消的勾子
#### 类型
```ts
cancel: (rejectResult?: unknown) => void;
```

#### 示例
```tsx
import React from 'react'
import { useDialog } from 'promise-dialog-react'

const Test1View = () => {
  const { cancel } = useDialog()
  const [count, setCount] = React.useState(0)

  function diyOnCancel() {
    cancel()
  }

  return (
    <div className="">
      Test1:count {count}
      <button onClick={() => setCount(count + 1)}>add count</button>
      <button onClick={diyOnCancel}>取消</button>
    </div>
  )
}
```

## currentDialog
当前的Dialog实例，参考[Dialog章节](./DialogApi)
