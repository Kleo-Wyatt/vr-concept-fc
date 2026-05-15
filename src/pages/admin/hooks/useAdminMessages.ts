import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  contactMessageQueryKeys,
  deleteContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  type ContactMessage,
} from '@entities/contact-message';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

import { getUnreadCount } from '../lib/getUnreadCount';

const EMPTY_MESSAGES: ContactMessage[] = [];

export function useAdminMessages() {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: contactMessageQueryKeys.admin,
    queryFn: getContactMessages,
  });

  const messages = messagesQuery.data ?? EMPTY_MESSAGES;

  const unreadMessagesCount = useMemo(
    () => getUnreadCount(messages),
    [messages],
  );

  const invalidateMessages = () =>
    queryClient.invalidateQueries({
      queryKey: contactMessageQueryKeys.admin,
    });

  const markMessageAsReadMutation = useMutation({
    mutationFn: markContactMessageAsRead,
    onSuccess: () => {
      void invalidateMessages();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить сообщение');
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: deleteContactMessage,
    onSuccess: () => {
      void invalidateMessages();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось удалить сообщение');
    },
  });

  const handleMarkMessageAsRead = async (id: number) => {
    await markMessageAsReadMutation.mutateAsync(id);
  };

  const handleDeleteMessage = async (id: number) => {
    await deleteMessageMutation.mutateAsync(id);
  };

  return {
    messages,
    unreadMessagesCount,
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,

    handleMarkMessageAsRead,
    handleDeleteMessage,
  };
}
