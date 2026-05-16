import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  actions,
  className,
}: SectionHeaderProps) {
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
