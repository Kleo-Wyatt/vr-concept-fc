import { apiRequest } from '@shared/api/http';

import type { UpcomingMatch } from './types';

export async function getUpcomingMatch() {
  return apiRequest<UpcomingMatch>('/schedule-events/upcoming-match', {
    method: 'GET',
  });
}
