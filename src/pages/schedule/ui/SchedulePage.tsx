import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button, Card, ScrollableFrame } from '@shared/ui';

import { getEventTimestamp, isPastTrainingEvent } from '../model/lib';
import { scheduleFilters } from '../model/mockData';
import {
  getScheduleEvents,
  scheduleEventsQueryKey,
} from '../model/scheduleEventsApi';
import type { StatusFilter } from '../model/types';

import { ScheduleEventCard } from './ScheduleEventCard/ScheduleEventCard';
import { ScheduleFilter } from './ScheduleFilter/ScheduleFilter';
import { ScheduleInfoSection } from './ScheduleInfoSection/ScheduleInfoSection';

import styles from './SchedulePage.module.css';

const VISIBLE_EVENTS_LIMIT = 10;

export function SchedulePage() {
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');

  const {
    data: scheduleEvents = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: scheduleEventsQueryKey,
    queryFn: getScheduleEvents,
  });

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
  }, [scheduleEvents, selectedFilter]);

  const hasScrollableEvents = filteredEvents.length > VISIBLE_EVENTS_LIMIT;

  const errorMessage =
    error instanceof Error ? error.message : 'Не удалось загрузить расписание';

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

          {isLoading && (
            <Card>
              <p>Загрузка расписания...</p>
            </Card>
          )}

          {error && (
            <Card>
              <p>{errorMessage}</p>
              <Button onClick={() => refetch()}>Повторить загрузку</Button>
            </Card>
          )}

          {!isLoading && !error && (
            <>
              <ScrollableFrame
                isScrollable={hasScrollableEvents}
                maxHeight="1180px"
              >
                <div className={styles.scheduleList}>
                  {filteredEvents.map((event) => (
                    <ScheduleEventCard event={event} key={event.id} />
                  ))}
                </div>
              </ScrollableFrame>

              {filteredEvents.length === 0 && (
                <div className={styles.emptyState}>
                  <p>Нет событий в этой категории</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ScheduleInfoSection />
    </main>
  );
}
