import type { ElementType, MouseEventHandler, ReactNode } from 'react';

import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'cta';

export type ButtonSize = 'small' | 'middle' | 'large';

export type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;

  /**
   * Позволяет использовать кнопку как Link из react-router-dom:
   * <Button as={Link} to="/team">Состав</Button>
   */
  as?: ElementType;
  to?: string;

  /**
   * Для внешних или обычных ссылок:
   * <Button href="https://example.com">Открыть</Button>
   */
  href?: string;
  target?: string;
  rel?: string;

  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

export function Button({
  children,
  variant = 'primary',
  size = 'middle',
  className = '',
  as: Component,
  to,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  title,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (Component) {
    return (
      <Component
        to={to}
        href={href}
        className={buttonClassName}
        title={title}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </Component>
    );
  }

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={target === '_blank' ? (rel ?? 'noreferrer') : rel}
        className={buttonClassName}
        title={title}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}