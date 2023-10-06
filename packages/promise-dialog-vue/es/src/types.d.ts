import type { DefineComponent } from 'vue';
export interface ComponentProps {
    [key: string]: unknown;
}
export interface ModalProps {
    [key: string]: unknown;
}
export type UnknownComponent<P extends ComponentProps = any> = DefineComponent<P, any, any>;
/**
 * 业务根据ui框架声明dialogify
 *
 * @example
 * ```ts
 *
    import { ModalProps } from 'ant-design-vue';
    declare module 'vue' {
      interface ComponentCustomOptions {
        dialogify?: ModalProps;
      }
    }
 * ```
 */
