import { Button, Card } from '@shared/ui';

import type { ScheduleEvent as AdminScheduleEvent } from '@entities/schedule-event';

import { getEventTitle, statusLabels } from './scheduleEventForm';

import styles from './AdminScheduleEvents.module.css';

type ScheduleEventCardProps = {
  event: AdminScheduleEvent;
  needsScore: boolean;
  isPastTraining: boolean;
  onEdit: (event: AdminScheduleEvent) => void;
  onDelete: (event: AdminScheduleEvent) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getScore(event: AdminScheduleEvent) {
  if (event.status !== 'finished') {
    return '—';
  }

  return `${event.homeScore}:${event.awayScore}`;
}

function getBadgeLabel(
  event: AdminScheduleEvent,
  needsScore: boolean,
  isPastTraining: boolean,
) {
  if (needsScore) {
    return 'Нужно добавить счёт';
  }

  if (isPastTraining) {
    return 'Проведена';
  }

  return statusLabels[event.status];
}

export function ScheduleEventCard({
  event,
  needsScore,
  isPastTraining,
  onEdit,
  onDelete,
}: ScheduleEventCardProps) {
  return (
    <Card
      className={[
        styles.eventCard,
        event.status === 'training' ? styles.eventCardTraining : '',
        isPastTraining ? styles.eventCardPastTraining : '',
        needsScore ? styles.eventCardNeedsScore : '',
      ].join(' ')}
    >
      <div className={styles.eventDateBlock}>
        <span className={styles.eventDate}>{formatDate(event.date)}</span>
        <span className={styles.eventTime}>{event.time}</span>
      </div>

      <div className={styles.eventInfo}>
        <div className={styles.eventTitleRow}>
          <h3 className={styles.eventTitle}>{getEventTitle(event)}</h3>

          <span
            className={[
              styles.badge,
              event.status === 'finished' ? styles.badgeFinished : '',
              event.status === 'training' ? styles.badgeTraining : '',
              event.status === 'upcoming' ? styles.badgeUpcoming : '',
              needsScore ? styles.badgeNeedsScore : '',
            ].join(' ')}
          >
            {getBadgeLabel(event, needsScore, isPastTraining)}
          </span>
        </div>

        <div className={styles.eventMeta}>
          <span>{event.tournament}</span>
          <span>{event.location}</span>
        </div>
      </div>

      {event.status !== 'training' && (
        <div className={styles.eventScore}>
          <span className={styles.eventScoreLabel}>Счёт</span>
          <strong>{getScore(event)}</strong>
        </div>
      )}

      <div className={styles.actions}>
        <Button size="small" variant="secondary" onClick={() => onEdit(event)}>
          Изменить
        </Button>

        <button
          className={styles.deleteIconButton}
          type="button"
          onClick={() => onDelete(event)}
          aria-label={`Удалить событие ${getEventTitle(event)}`}
          title="Удалить"
        >
          <svg
            className={styles.deleteIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </Card>
  );
}
