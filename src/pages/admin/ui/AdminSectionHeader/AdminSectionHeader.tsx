import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './AdminSectionHeader.module.css';

type AdminSectionHeaderProps = {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function AdminSectionHeader({
  title,
  description,
  actions,
  className,
}: AdminSectionHeaderProps) {
  return (
    <div className={clsx(styles.header, className)}>
      <div>
        <h2>{title}</h2>

        {description && <p>{description}</p>}
      </div>

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
