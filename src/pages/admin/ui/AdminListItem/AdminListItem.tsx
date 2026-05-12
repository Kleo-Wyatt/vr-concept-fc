import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './AdminListItem.module.css';

type AdminListItemProps = {
  header: ReactNode;
  title: ReactNode;
  preview?: ReactNode;
  date?: ReactNode;
  active?: boolean;
  unread?: boolean;
  unreadLabel?: string;
  onClick: () => void;
};

export function AdminListItem({
  header,
  title,
  preview,
  date,
  active = false,
  unread = false,
  unreadLabel = 'Новое',
  onClick,
}: AdminListItemProps) {
  return (
    <button
      className={clsx(
        styles.item,
        unread && styles.unread,
        active && styles.active,
      )}
      type="button"
      onClick={onClick}
    >
      <span className={styles.header}>
        <strong>{header}</strong>

        {unread && <span className={styles.badge}>{unreadLabel}</span>}
      </span>

      <span className={styles.title}>{title}</span>

      {preview && <span className={styles.preview}>{preview}</span>}

      {date && <span className={styles.date}>{date}</span>}
    </button>
  );
}
