import type { ModalProps } from 'ant-design-vue'

declare module 'vue' {
  interface ComponentCustomOptions {
    dialogify?: ModalProps
  }
}
