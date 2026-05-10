import { Button, Card } from '@shared/ui';

import type { AdminScheduleEvent } from '../../model/scheduleEventsApi';

import { getEventTitle, statusLabels } from './scheduleEventForm';

import styles from './AdminScheduleEvents.module.css';

type ScheduleEventCardProps = {
  event: AdminScheduleEvent;
  onEdit: (event: AdminScheduleEvent) => void;
  onDelete: (event: AdminScheduleEvent) => void;
};

export function ScheduleEventCard({
  event,
  onEdit,
  onDelete,
}: ScheduleEventCardProps) {
  return (
    <Card className={styles.eventCard}>
      <div className={styles.eventDate}>
        <span>{new Date(event.date).toLocaleDateString('ru-RU')}</span>
        <span className={styles.eventTime}>{event.time}</span>
      </div>

      <div className={styles.eventMain}>
        <h3>{getEventTitle(event)}</h3>
        <p>{event.location}</p>
        <p>{event.tournament}</p>

        {event.status === 'finished' && (
          <p>
            Счёт: {event.homeScore} : {event.awayScore}
          </p>
        )}

        <span className={styles.status}>{statusLabels[event.status]}</span>
      </div>

      <div className={styles.actions}>
        <Button size="small" onClick={() => onEdit(event)}>
          Редактировать
        </Button>

        <Button size="small" variant="danger" onClick={() => onDelete(event)}>
          Удалить
        </Button>
      </div>
    </Card>
  );
}
