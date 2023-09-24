export interface DialogFC<P = any> extends React.FC<P> {
  dialogify?: Record<PropertyKey, unknown>;
}

export type ComponentProps = Record<PropertyKey, unknown>;
export interface ModalProps extends Record<PropertyKey, any> {}
export type UnkownFC<P extends ComponentProps = any> = React.FC<P>;

export type CreateByComponentParams<P extends ComponentProps = any> = [
  DialogFC<P>,
  ComponentProps?,
  ModalProps?,
];

export type CreateByReactNodeParams = [React.ReactNode, ModalProps?];

export type CreateParams<
  T extends DialogFC<P> | React.ReactNode,
  P extends ComponentProps,
> = [
  DialogFC<P> | React.ReactNode,
  (T extends React.ReactNode ? ModalProps : P)?,
  ModalProps?,
];

/**
 * 业务根据ui框架声明dialogify
 *
 * @example
 * ```ts
    import { ModalProps } from 'ant-design';

    declare module '@/featrues/dialog' {
      interface DialogFC<P> extends React.FC<P> {
        dialogify?: ModalProps;
      }
    }
 * ```
 */
