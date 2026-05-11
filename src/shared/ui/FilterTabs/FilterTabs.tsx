import clsx from 'clsx';

import styles from './FilterTabs.module.css';

export type FilterTabItem<Value extends string = string> = {
  value: Value;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export type FilterTabsProps<Value extends string = string> = {
  items: readonly FilterTabItem<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  className?: string;
  ariaLabel?: string;
};

export function FilterTabs<Value extends string = string>({
  items,
  value,
  onChange,
  className = '',
  ariaLabel = 'Фильтры',
}: FilterTabsProps<Value>) {
  return (
    <div className={clsx(styles.filters, className)} aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            className={clsx(styles.filterButton, isActive && styles.active)}
            type="button"
            key={item.value}
            disabled={item.disabled}
            aria-label={item.ariaLabel}
            aria-pressed={isActive}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
