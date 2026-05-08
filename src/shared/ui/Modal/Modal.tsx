import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import clsx from 'clsx';

import styles from './Modal.module.css';

export type ModalContentPadding = 'default' | 'none';

export type ModalProps = AntModalProps & {
  className?: string;
  contentPadding?: ModalContentPadding;
};

export function Modal({
  children,
  className = '',
  centered = true,
  contentPadding = 'default',
  styles: modalStyles,
  ...props
}: ModalProps) {
  const modalClassName = clsx(styles.modal, className);
  const hasNoContentPadding = contentPadding === 'none';

  return (
    <AntModal
      className={modalClassName}
      centered={centered}
      styles={(info) => {
        const baseStyles =
          typeof modalStyles === 'function'
            ? modalStyles(info)
            : (modalStyles ?? {});

        return {
          ...baseStyles,
          container: {
            ...baseStyles.container,
            ...(hasNoContentPadding
              ? {
                  padding: 0,
                  overflow: 'hidden',
                }
              : {}),
          },
          body: {
            ...baseStyles.body,
            ...(hasNoContentPadding
              ? {
                  padding: 0,
                }
              : {}),
          },
        };
      }}
      {...props}
    >
      {children}
    </AntModal>
  );
}
