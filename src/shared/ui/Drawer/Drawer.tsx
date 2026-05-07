import { Drawer as AntDrawer } from 'antd';
import type { DrawerProps as AntDrawerProps } from 'antd';
import clsx from 'clsx';

import styles from './Drawer.module.css';

export type DrawerProps = AntDrawerProps & {
  className?: string;
};

export function Drawer({
  children,
  className,
  size = 'large',
  placement = 'right',
  ...props
}: DrawerProps) {
  return (
    <AntDrawer
      className={clsx(styles.drawer, className)}
      size={size}
      placement={placement}
      {...props}
    >
      {children}
    </AntDrawer>
  );
}
