import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';

import {
  deleteAdminTicketRequest,
  getAdminTicketRequests,
  markAdminTicketRequestAsRead,
} from '../model/adminStorage';
import { adminQueryKeys } from '../model/queryKeys';
import { getUnreadCount } from '../lib/getUnreadCount';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

const EMPTY_TICKET_REQUESTS: TicketRequest[] = [];

export function useAdminTicketRequests() {
  const queryClient = useQueryClient();

  const ticketRequestsQuery = useQuery({
    queryKey: adminQueryKeys.ticketRequests,
    queryFn: getAdminTicketRequests,
  });

  const ticketRequests = ticketRequestsQuery.data ?? EMPTY_TICKET_REQUESTS;

  const unreadTicketRequestsCount = useMemo(
    () => getUnreadCount(ticketRequests),
    [ticketRequests],
  );

  const invalidateTicketRequests = () =>
    queryClient.invalidateQueries({
      queryKey: adminQueryKeys.ticketRequests,
    });

  const markTicketRequestAsReadMutation = useMutation({
    mutationFn: markAdminTicketRequestAsRead,
    onSuccess: () => {
      void invalidateTicketRequests();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить заявку');
    },
  });

  const deleteTicketRequestMutation = useMutation({
    mutationFn: deleteAdminTicketRequest,
    onSuccess: () => {
      void invalidateTicketRequests();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось удалить заявку');
    },
  });

  const handleMarkTicketRequestAsRead = async (id: number) => {
    await markTicketRequestAsReadMutation.mutateAsync(id);
  };

  const handleDeleteTicketRequest = async (id: number) => {
    await deleteTicketRequestMutation.mutateAsync(id);
  };

  return {
    ticketRequests,
    unreadTicketRequestsCount,
    isLoading: ticketRequestsQuery.isLoading,
    error: ticketRequestsQuery.error,

    handleMarkTicketRequestAsRead,
    handleDeleteTicketRequest,
  };
}
