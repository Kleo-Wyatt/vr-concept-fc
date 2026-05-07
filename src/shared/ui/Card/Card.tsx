import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';

import styles from './Card.module.css';

export type CardProps = AntCardProps & {
  className?: string;
};

export function Card({
  children,
  className = '',
  hoverable = false,
  ...props
}: CardProps) {
  const cardClassName = [styles.card, className].filter(Boolean).join(' ');

  return (
    <AntCard className={cardClassName} hoverable={hoverable} {...props}>
      {children}
    </AntCard>
  );
}
