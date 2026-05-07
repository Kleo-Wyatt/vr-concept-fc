import type { StatusFilter } from '../../model/types';

import styles from './ScheduleFilter.module.css';import clsx from 'clsx';


type ScheduleFilterItem = {
  value: StatusFilter;
  label: string;
};

type ScheduleFilterProps = {
  filters: ScheduleFilterItem[];
  selectedFilter: StatusFilter;
  onSelectFilter: (filter: StatusFilter) => void;
};

export function ScheduleFilter({
  filters,
  selectedFilter,
  onSelectFilter,
}: ScheduleFilterProps) {
  return (
    <div className={styles.filters}>
      {filters.map((filter) => (
        <button
          className={clsx(
            styles.filterButton,
            selectedFilter === filter.value && styles.filterButtonActive,
          )}
          key={filter.value}
          type="button"
          onClick={() => onSelectFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
