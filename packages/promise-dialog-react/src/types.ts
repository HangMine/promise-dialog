export interface DialogFC<P = any> extends React.FC<P> {
  dialogify?: ModalProps;
}

export type ComponentProps = Record<PropertyKey, any>;
export interface ModalProps extends Record<PropertyKey, any> {}
export type UnkownFC<P extends ComponentProps = any> = React.FC<P>;

/**
 * 业务根据ui框架声明dialogify
 *
 * @example
 * ```ts
    import { TtModalProps } from 'tt-components';

    declare module '@/featrues/dialog' {
      interface ModalProps extends TtModalProps {}
    }
 * ```
 */
