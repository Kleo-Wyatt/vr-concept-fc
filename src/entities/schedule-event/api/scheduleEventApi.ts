import { apiRequest } from '@shared/api/http';

import type {
  ScheduleEvent,
  ScheduleEventPayload,
  UpcomingMatch,
} from '../model/types';

export function getScheduleEvents() {
  return apiRequest<ScheduleEvent[]>('/schedule-events');
}

export function getUpcomingMatch() {
  return apiRequest<UpcomingMatch>('/schedule-events/upcoming-match');
}

export function createScheduleEvent(payload: ScheduleEventPayload) {
  return apiRequest<ScheduleEvent>('/schedule-events', {
    method: 'POST',
    body: payload,
  });
}

export function updateScheduleEvent(id: number, payload: ScheduleEventPayload) {
  return apiRequest<ScheduleEvent>(`/schedule-events/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteScheduleEvent(id: number) {
  return apiRequest<void>(`/schedule-events/${id}`, {
    method: 'DELETE',
  });
}
