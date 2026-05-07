import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';

import styles from './Modal.module.css';

export type ModalProps = AntModalProps & {
  className?: string;
};

export function Modal({
  children,
  className = '',
  centered = true,
  ...props
}: ModalProps) {
  const modalClassName = [styles.modal, className].filter(Boolean).join(' ');

  return (
    <AntModal className={modalClassName} centered={centered} {...props}>
      {children}
    </AntModal>
  );
}