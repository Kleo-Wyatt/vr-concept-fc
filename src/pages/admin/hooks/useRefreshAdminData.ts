import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { adminQueryKeys } from '../model/queryKeys';

export function useRefreshAdminData() {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.players,
      }),
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.scheduleEvents,
      }),
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.news,
      }),
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.contactMessages,
      }),
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.ticketRequests,
      }),
    ]);
  }, [queryClient]);
}
