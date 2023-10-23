---
next:
  text: '快速上手'
  link: '/getting-started/'
---

# 简介

## 什么是 promise-dialog?
promise-dialog让 弹窗开发 简单 高效

## 函数式调用
通过函数直接调起弹窗，不用再引入Modal组件，写visible、onOk、onCancel参数

## promise管理弹窗流程
promise管理，点击确认resolve，点击取消reject，让弹窗流程、数据流更直观，让代码更简洁

## 包含上下文
弹窗内部的组件包含上下文，不会丢失上下文的配置、全局组件等

## 简单示例
```ts
import { useDialog } from 'promise-dialog-vue'
import Test1View from './Test1View.vue'

const { dialog } = useDialog()

const result = await dialog(Test1View)
// result为点击确认的结果
console.log('test1 resutl:', result)
```

