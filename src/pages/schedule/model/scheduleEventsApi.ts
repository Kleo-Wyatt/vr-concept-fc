import { apiRequest } from '@shared/api/http';

import type { ScheduleEvent } from './types';

export const scheduleEventsQueryKey = ['schedule-events'] as const;

export function getScheduleEvents() {
  return apiRequest<ScheduleEvent[]>('/schedule-events');
}
