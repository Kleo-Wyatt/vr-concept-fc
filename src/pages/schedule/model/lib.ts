import type { ScheduleEvent } from '@entities/schedule-event';

export function getEventTimestamp(event: ScheduleEvent) {
  return new Date(`${event.date}T${event.time}`).getTime();
}

export function getDateOnlyTimestamp(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

export function isPastTrainingEvent(event: ScheduleEvent) {
  if (event.status !== 'training') {
    return false;
  }

  const todayTimestamp = getDateOnlyTimestamp(new Date());
  const eventDate = new Date(`${event.date}T00:00`);
  const eventDateTimestamp = getDateOnlyTimestamp(eventDate);

  return eventDateTimestamp < todayTimestamp;
}

export function formatScheduleDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getEventTitle(event: ScheduleEvent) {
  if (event.status === 'training') {
    return 'Тренировка';
  }

  return `${event.homeTeam} vs ${event.awayTeam}`;
}
