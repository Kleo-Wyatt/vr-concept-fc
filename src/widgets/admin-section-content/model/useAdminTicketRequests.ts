import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteTicketRequest,
  getTicketRequests,
  markTicketRequestAsRead,
  ticketRequestQueryKeys,
  type TicketRequest,
} from '@entities/ticket-request';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

import { getUnreadCount } from '../lib/getUnreadCount';

const EMPTY_TICKET_REQUESTS: TicketRequest[] = [];

export function useAdminTicketRequests() {
  const queryClient = useQueryClient();

  const ticketRequestsQuery = useQuery({
    queryKey: ticketRequestQueryKeys.admin,
    queryFn: getTicketRequests,
  });

  const ticketRequests = ticketRequestsQuery.data ?? EMPTY_TICKET_REQUESTS;

  const unreadTicketRequestsCount = useMemo(
    () => getUnreadCount(ticketRequests),
    [ticketRequests],
  );

  const invalidateTicketRequests = () =>
    queryClient.invalidateQueries({
      queryKey: ticketRequestQueryKeys.admin,
    });

  const markTicketRequestAsReadMutation = useMutation({
    mutationFn: markTicketRequestAsRead,
    onSuccess: () => {
      void invalidateTicketRequests();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить заявку');
    },
  });

  const deleteTicketRequestMutation = useMutation({
    mutationFn: deleteTicketRequest,
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
