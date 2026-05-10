import type { ScheduleStatus } from '@pages/schedule/model/types';

import type {
  AdminScheduleEvent,
  ScheduleEventPayload,
} from '../../model/scheduleEventsApi';

export const initialScheduleEventFormData: ScheduleEventPayload = {
  date: '',
  time: '19:00',
  status: 'training',
  homeTeam: '',
  awayTeam: '',
  homeScore: null,
  awayScore: null,
  location: 'Тренировочное поле',
  tournament: 'Тренировка',
};

export const statusOptions = [
  {
    value: 'training',
    label: 'Тренировка',
  },
  {
    value: 'upcoming',
    label: 'Предстоящий матч',
  },
  {
    value: 'finished',
    label: 'Завершенный матч',
  },
];

export const statusLabels: Record<ScheduleStatus, string> = {
  training: 'Тренировка',
  upcoming: 'Предстоящий матч',
  finished: 'Завершенный матч',
};

export function getEventTitle(event: AdminScheduleEvent) {
  if (event.status === 'training') {
    return 'Тренировка';
  }

  return `${event.homeTeam} vs ${event.awayTeam}`;
}

export function getScheduleEventFormData(
  event: AdminScheduleEvent,
): ScheduleEventPayload {
  if (event.status === 'training') {
    return {
      date: event.date,
      time: event.time,
      status: event.status,
      homeTeam: '',
      awayTeam: '',
      homeScore: null,
      awayScore: null,
      location: event.location,
      tournament: event.tournament,
    };
  }

  if (event.status === 'upcoming') {
    return {
      date: event.date,
      time: event.time,
      status: event.status,
      homeTeam: event.homeTeam,
      awayTeam: event.awayTeam,
      homeScore: null,
      awayScore: null,
      location: event.location,
      tournament: event.tournament,
    };
  }

  return {
    date: event.date,
    time: event.time,
    status: event.status,
    homeTeam: event.homeTeam,
    awayTeam: event.awayTeam,
    homeScore: event.homeScore,
    awayScore: event.awayScore,
    location: event.location,
    tournament: event.tournament,
  };
}

export function validateScheduleEventForm(formData: ScheduleEventPayload) {
  if (!formData.date.trim()) {
    return 'Введите дату события';
  }

  if (!formData.time.trim()) {
    return 'Введите время события';
  }

  if (!formData.location.trim()) {
    return 'Введите место проведения';
  }

  if (!formData.tournament.trim()) {
    return 'Введите турнир или тип события';
  }

  if (formData.status !== 'training') {
    if (!formData.homeTeam.trim()) {
      return 'Введите домашнюю команду';
    }

    if (!formData.awayTeam.trim()) {
      return 'Введите гостевую команду';
    }
  }

  if (formData.status === 'finished') {
    if (
      formData.homeScore === null ||
      formData.awayScore === null ||
      !Number.isInteger(formData.homeScore) ||
      !Number.isInteger(formData.awayScore) ||
      formData.homeScore < 0 ||
      formData.awayScore < 0
    ) {
      return 'Для завершенного матча укажите счет';
    }
  }

  return '';
}

export function normalizeScheduleEventForm(
  formData: ScheduleEventPayload,
): ScheduleEventPayload {
  if (formData.status === 'training') {
    return {
      ...formData,
      homeTeam: '',
      awayTeam: '',
      homeScore: null,
      awayScore: null,
      location: formData.location.trim(),
      tournament: formData.tournament.trim(),
    };
  }

  if (formData.status === 'upcoming') {
    return {
      ...formData,
      homeTeam: formData.homeTeam.trim(),
      awayTeam: formData.awayTeam.trim(),
      homeScore: null,
      awayScore: null,
      location: formData.location.trim(),
      tournament: formData.tournament.trim(),
    };
  }

  return {
    ...formData,
    homeTeam: formData.homeTeam.trim(),
    awayTeam: formData.awayTeam.trim(),
    location: formData.location.trim(),
    tournament: formData.tournament.trim(),
  };
}
