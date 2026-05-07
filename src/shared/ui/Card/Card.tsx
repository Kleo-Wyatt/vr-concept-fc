import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';

import styles from './Card.module.css';import clsx from 'clsx';


export type CardProps = AntCardProps & {
  className?: string;
};

export function Card({
  children,
  className = '',
  hoverable = false,
  ...props
}: CardProps) {
  const cardClassName = clsx(
    styles.card,
    className,
  );

  return (
    <AntCard className={cardClassName} hoverable={hoverable} {...props}>
      {children}
    </AntCard>
  );
}
