import { DefineComponent, VNode } from 'vue';

export interface ComponentProps {
  [key: string]: unknown;
}
export interface ModalProps {
  [key: string]: unknown;
}
export type UnknownComponent<P extends ComponentProps = any> = DefineComponent<P, any, any>;

export type CreateByComponentParams<P extends ComponentProps = any> = [
  UnknownComponent<P>,
  ComponentProps?,
  ModalProps?,
];

export type CreateByVnodeParams = [VNode, ModalProps?];

export type CreateParams<T extends UnknownComponent<P> | VNode, P extends ComponentProps> = [
  UnknownComponent<P> | VNode,
  (T extends VNode ? ModalProps : P)?,
  ModalProps?,
];

/**
 * 业务根据ui框架声明dialogify
 *
 * @example
 * ```ts
 * 
    import { ModalProps } from 'ant-design-vue';
    declare module '@vue/runtime-core' {
      interface ComponentCustomOptions {
        dialogify?: ModalProps;
      }
    }
 * ```
 */
