import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ContactMessage } from '@pages/contacts/model/types';
import { getUnknownErrorMessage } from '@shared/lib/errors/getUnknownErrorMessage';

import {
  deleteAdminContactMessage,
  getAdminContactMessages,
  markAdminContactMessageAsRead,
} from '../model/adminStorage';
import { adminQueryKeys } from '../model/queryKeys';
import { getUnreadCount } from '../lib/getUnreadCount';

const EMPTY_MESSAGES: ContactMessage[] = [];

export function useAdminMessages() {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: adminQueryKeys.contactMessages,
    queryFn: getAdminContactMessages,
  });

  const messages = messagesQuery.data ?? EMPTY_MESSAGES;

  const unreadMessagesCount = useMemo(
    () => getUnreadCount(messages),
    [messages],
  );

  const invalidateMessages = () =>
    queryClient.invalidateQueries({
      queryKey: adminQueryKeys.contactMessages,
    });

  const markMessageAsReadMutation = useMutation({
    mutationFn: markAdminContactMessageAsRead,
    onSuccess: () => {
      void invalidateMessages();
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось обновить сообщение'));
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: deleteAdminContactMessage,
    onSuccess: () => {
      void invalidateMessages();
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось удалить сообщение'));
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
