import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { newsQueryKeys } from '@entities/news';
import { playerQueryKeys } from '@entities/player';
import { scheduleEventQueryKeys } from '@entities/schedule-event';
import { ticketRequestQueryKeys } from '@entities/ticket-request';
import { contactMessageQueryKeys } from '@entities/contact-message';

export function useRefreshAdminData() {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: playerQueryKeys.all,
      }),
      queryClient.invalidateQueries({
        queryKey: scheduleEventQueryKeys.all,
      }),
      queryClient.invalidateQueries({
        queryKey: newsQueryKeys.all,
      }),
      queryClient.invalidateQueries({
        queryKey: ticketRequestQueryKeys.admin,
      }),
      queryClient.invalidateQueries({
        queryKey: contactMessageQueryKeys.admin,
      }),
    ]);
  }, [queryClient]);
}
