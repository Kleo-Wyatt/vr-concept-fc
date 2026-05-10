import { apiRequest } from '@shared/api/http';

import type {
  ScheduleEvent,
  ScheduleStatus,
} from '@pages/schedule/model/types';

export type AdminScheduleEvent = ScheduleEvent;

export type ScheduleEventPayload = {
  date: string;
  time: string;
  status: ScheduleStatus;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  location: string;
  tournament: string;
};

export function getAdminScheduleEvents() {
  return apiRequest<AdminScheduleEvent[]>('/schedule-events');
}

export function createAdminScheduleEvent(payload: ScheduleEventPayload) {
  return apiRequest<AdminScheduleEvent>('/schedule-events', {
    method: 'POST',
    body: payload,
  });
}

export function updateAdminScheduleEvent(
  id: number,
  payload: ScheduleEventPayload,
) {
  return apiRequest<AdminScheduleEvent>(`/schedule-events/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteAdminScheduleEvent(id: number) {
  return apiRequest<void>(`/schedule-events/${id}`, {
    method: 'DELETE',
  });
}
