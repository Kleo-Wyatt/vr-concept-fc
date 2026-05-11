import { useState } from 'react';

import { Button, Card } from '@shared/ui';

import { formatScheduleDate, getEventTitle } from '../../model/lib';
import type { ScheduleEvent } from '../../model/types';

import { TicketRequestModal } from '../TicketRequestModal/TicketRequestModal';

import styles from './ScheduleEventCard.module.css';
import { formatShortMonthRu } from '@shared/lib/date';

type ScheduleEventCardProps = {
  event: ScheduleEvent;
};

type BadgeStatus = 'finished' | 'training';

const statusLabels: Record<BadgeStatus, string> = {
  finished: 'Завершен',
  training: 'Тренировка',
};

function getStatusClassName(status: BadgeStatus) {
  if (status === 'finished') {
    return styles.badgeFinished;
  }

  return styles.badgeTraining;
}

export function ScheduleEventCard({ event }: ScheduleEventCardProps) {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <>
      <Card className={styles.card}>
        <div className={styles.dateBox}>
          <div className={styles.dateNumber}>
            {new Date(event.date).getDate()}
          </div>

          <div className={styles.dateMonth}>
            {formatShortMonthRu(event.date)}
          </div>
        </div>

        <div className={styles.main}>
          <h2 className={styles.title}>{getEventTitle(event)}</h2>

          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>📅 Дата:</span>
              <span className={styles.detailValue}>
                {formatScheduleDate(event.date)} в {event.time}
              </span>
            </div>

            <div className={styles.detail}>
              <span className={styles.detailLabel}>📍 Место:</span>
              <span className={styles.detailValue}>{event.location}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.detailLabel}>🏆 Турнир:</span>
              <span className={styles.detailValue}>{event.tournament}</span>
            </div>
          </div>
        </div>

        <div className={styles.statusColumn}>
          {event.status === 'upcoming' ? (
            <Button size="small" onClick={() => setIsTicketModalOpen(true)}>
              Купить билет
            </Button>
          ) : (
            <span
              className={[styles.badge, getStatusClassName(event.status)].join(
                ' ',
              )}
            >
              {statusLabels[event.status]}
            </span>
          )}

          {event.status === 'finished' && (
            <div className={styles.scoreBlock}>
              <span className={styles.scoreLabel}>Счёт</span>
              <span className={styles.score}>
                {event.homeScore} : {event.awayScore}
              </span>
            </div>
          )}
        </div>
      </Card>

      {event.status === 'upcoming' && (
        <TicketRequestModal
          match={event}
          open={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
        />
      )}
    </>
  );
}
