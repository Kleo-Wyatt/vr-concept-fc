import { useMemo, useState } from 'react';

import { getEventTimestamp, isPastTrainingEvent } from '../model/lib';
import { scheduleEvents, scheduleFilters } from '../model/mockData';
import type { StatusFilter } from '../model/types';

import { ScheduleEventCard } from './ScheduleEventCard/ScheduleEventCard';
import { ScheduleFilter } from './ScheduleFilter/ScheduleFilter';
import { ScheduleInfoSection } from './ScheduleInfoSection/ScheduleInfoSection';

import styles from './SchedulePage.module.css';

const VISIBLE_EVENTS_LIMIT = 10;

export function SchedulePage() {
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');

  const filteredEvents = useMemo(() => {
    const actualEvents = scheduleEvents.filter(
      (event) => !isPastTrainingEvent(event),
    );

    const result =
      selectedFilter === 'all'
        ? actualEvents
        : actualEvents.filter((event) => event.status === selectedFilter);

    const shouldSortFromNearest =
      selectedFilter === 'upcoming' || selectedFilter === 'training';

    return [...result].sort((a, b) => {
      if (shouldSortFromNearest) {
        return getEventTimestamp(a) - getEventTimestamp(b);
      }

      return getEventTimestamp(b) - getEventTimestamp(a);
    });
  }, [selectedFilter]);

  const shouldHideScrollbar = filteredEvents.length <= VISIBLE_EVENTS_LIMIT;
  const hasScrollableEvents = filteredEvents.length > VISIBLE_EVENTS_LIMIT;

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Расписание</h1>
          <p className={styles.pageDescription}>
            Матчи и тренировки нашей команды
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <ScheduleFilter
            filters={scheduleFilters}
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
          />

          <div
            className={[
              styles.scheduleListFrame,
              hasScrollableEvents ? styles.scheduleListFrameWithFade : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div
              className={[
                styles.scheduleListWrapper,
                shouldHideScrollbar
                  ? styles.scheduleListWrapperWithoutScrollbar
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.scheduleList}>
                {filteredEvents.map((event) => (
                  <ScheduleEventCard event={event} key={event.id} />
                ))}
              </div>
            </div>
          </div>

          {filteredEvents.length === 0 && (
            <div className={styles.emptyState}>
              <p>Нет событий в этой категории</p>
            </div>
          )}
        </div>
      </section>

      <ScheduleInfoSection />
    </main>
  );
}
