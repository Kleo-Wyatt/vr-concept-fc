import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './AdminInfoGrid.module.css';

export type AdminInfoGridItem = {
  label: string;
  value: ReactNode;
  hidden?: boolean;
};

type AdminInfoGridProps = {
  items: readonly AdminInfoGridItem[];
  className?: string;
};

export function AdminInfoGrid({ items, className }: AdminInfoGridProps) {
  const visibleItems = items.filter((item) => !item.hidden);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <dl className={clsx(styles.grid, className)}>
      {visibleItems.map((item) => (
        <div className={styles.item} key={item.label}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
