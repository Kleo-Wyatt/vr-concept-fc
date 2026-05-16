import { TicketRequestButton } from '@features/ticket-request';
import { Card } from '@shared/ui';
import { formatShortMonthRu } from '@shared/lib/date';

import { formatScheduleDate, getEventTitle } from '../../model/lib';
import type { ScheduleEvent } from '@entities/schedule-event';

import styles from './ScheduleEventCard.module.css';

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
  return (
    <Card className={styles.card}>
      <div className={styles.dateBox}>
        <div className={styles.dateNumber}>
          {new Date(event.date).getDate()}
        </div>

        <div className={styles.dateMonth}>{formatShortMonthRu(event.date)}</div>
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
          <TicketRequestButton match={event} size="small">
            Купить билет
          </TicketRequestButton>
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
  );
}
