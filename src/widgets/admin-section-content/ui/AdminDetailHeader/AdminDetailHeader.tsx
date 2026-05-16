import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './AdminDetailHeader.module.css';

type AdminDetailHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function AdminDetailHeader({
  title,
  description,
  actions,
  className,
}: AdminDetailHeaderProps) {
  return (
    <div className={clsx(styles.header, className)}>
      <div>
        <h3>{title}</h3>

        {description && <p>{description}</p>}
      </div>

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
