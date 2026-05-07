import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';

import styles from './Modal.module.css';import clsx from 'clsx';


export type ModalProps = AntModalProps & {
  className?: string;
};

export function Modal({
  children,
  className = '',
  centered = true,
  ...props
}: ModalProps) {
  const modalClassName = clsx(
    styles.modal,
    className,
  );

  return (
    <AntModal className={modalClassName} centered={centered} {...props}>
      {children}
    </AntModal>
  );
}