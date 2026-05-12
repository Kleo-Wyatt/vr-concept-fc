import type { ReactNode } from 'react';
import clsx from 'clsx';

import { Card } from '@shared/ui';

import styles from './AdminMasterDetailLayout.module.css';

type AdminMasterDetailLayoutProps = {
  list: ReactNode;
  detail: ReactNode;
  className?: string;
  listClassName?: string;
  detailClassName?: string;
};

export function AdminMasterDetailLayout({
  list,
  detail,
  className,
  listClassName,
  detailClassName,
}: AdminMasterDetailLayoutProps) {
  return (
    <div className={clsx(styles.layout, className)}>
      <div className={clsx(styles.listPanel, listClassName)}>{list}</div>

      <Card className={clsx(styles.detailPanel, detailClassName)}>
        {detail}
      </Card>
    </div>
  );
}
