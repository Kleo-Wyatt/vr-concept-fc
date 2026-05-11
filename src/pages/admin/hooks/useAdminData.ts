import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteAdminContactMessage,
  deleteAdminTicketRequest,
  getAdminContactMessages,
  getAdminTicketRequests,
  markAdminContactMessageAsRead,
  markAdminTicketRequestAsRead,
} from '../model/adminStorage';
import {
  createAdminPlayer,
  deleteAdminPlayer,
  getAdminPlayers,
  updateAdminPlayer,
  type Player,
  type PlayerPayload,
} from '../model/playersApi';
import {
  createAdminScheduleEvent,
  deleteAdminScheduleEvent,
  getAdminScheduleEvents,
  updateAdminScheduleEvent,
  type AdminScheduleEvent,
  type ScheduleEventPayload,
} from '../model/scheduleEventsApi';
import {
  createAdminNews,
  deleteAdminNews,
  getAdminNews,
  updateAdminNews,
  type AdminNewsItem,
  type NewsPayload,
} from '../model/newsApi';
import { adminQueryKeys } from '../model/queryKeys';

import type { ContactMessage } from '@pages/contacts/model/types';
import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';

function getUnknownErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

const EMPTY_PLAYERS: Player[] = [];
const EMPTY_SCHEDULE_EVENTS: AdminScheduleEvent[] = [];
const EMPTY_NEWS: AdminNewsItem[] = [];
const EMPTY_MESSAGES: ContactMessage[] = [];
const EMPTY_TICKET_REQUESTS: TicketRequest[] = [];

export function useAdminData() {
  const queryClient = useQueryClient();

  const playersQuery = useQuery({
    queryKey: adminQueryKeys.players,
    queryFn: getAdminPlayers,
  });

  const scheduleEventsQuery = useQuery({
    queryKey: adminQueryKeys.scheduleEvents,
    queryFn: getAdminScheduleEvents,
  });

  const newsQuery = useQuery({
    queryKey: adminQueryKeys.news,
    queryFn: getAdminNews,
  });

  const messagesQuery = useQuery({
    queryKey: adminQueryKeys.contactMessages,
    queryFn: getAdminContactMessages,
  });

  const ticketRequestsQuery = useQuery({
    queryKey: adminQueryKeys.ticketRequests,
    queryFn: getAdminTicketRequests,
  });

  const players = playersQuery.data ?? EMPTY_PLAYERS;
  const scheduleEvents = scheduleEventsQuery.data ?? EMPTY_SCHEDULE_EVENTS;
  const news = newsQuery.data ?? EMPTY_NEWS;
  const messages = messagesQuery.data ?? EMPTY_MESSAGES;
  const ticketRequests = ticketRequestsQuery.data ?? EMPTY_TICKET_REQUESTS;

  const isLoading =
    playersQuery.isLoading ||
    scheduleEventsQuery.isLoading ||
    newsQuery.isLoading ||
    messagesQuery.isLoading ||
    ticketRequestsQuery.isLoading;

  const loadError =
    getUnknownErrorMessage(playersQuery.error, '') ||
    getUnknownErrorMessage(scheduleEventsQuery.error, '') ||
    getUnknownErrorMessage(newsQuery.error, '') ||
    getUnknownErrorMessage(messagesQuery.error, '') ||
    getUnknownErrorMessage(ticketRequestsQuery.error, '');

  const unreadMessagesCount = useMemo(
    () => messages.filter((message) => !message.read).length,
    [messages],
  );

  const unreadTicketRequestsCount = useMemo(
    () => ticketRequests.filter((request) => !request.read).length,
    [ticketRequests],
  );

  const refreshAdminData = async () => {
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
  };

  const markMessageAsReadMutation = useMutation({
    mutationFn: markAdminContactMessageAsRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.contactMessages,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось обновить сообщение'));
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: deleteAdminContactMessage,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.contactMessages,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось удалить сообщение'));
    },
  });

  const markTicketRequestAsReadMutation = useMutation({
    mutationFn: markAdminTicketRequestAsRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.ticketRequests,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось обновить заявку'));
    },
  });

  const deleteTicketRequestMutation = useMutation({
    mutationFn: deleteAdminTicketRequest,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.ticketRequests,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось удалить заявку'));
    },
  });

  const createPlayerMutation = useMutation({
    mutationFn: createAdminPlayer,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.players,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось добавить игрока'));
    },
  });

  const updatePlayerMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: PlayerPayload }) =>
      updateAdminPlayer(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.players,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось обновить игрока'));
    },
  });

  const deletePlayerMutation = useMutation({
    mutationFn: deleteAdminPlayer,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.players,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось удалить игрока'));
    },
  });

  const createScheduleEventMutation = useMutation({
    mutationFn: createAdminScheduleEvent,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.scheduleEvents,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось добавить событие'));
    },
  });

  const updateScheduleEventMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ScheduleEventPayload;
    }) => updateAdminScheduleEvent(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.scheduleEvents,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось обновить событие'));
    },
  });

  const deleteScheduleEventMutation = useMutation({
    mutationFn: deleteAdminScheduleEvent,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.scheduleEvents,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось удалить событие'));
    },
  });

  const createNewsMutation = useMutation({
    mutationFn: createAdminNews,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.news,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось добавить новость'));
    },
  });

  const updateNewsMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: NewsPayload }) =>
      updateAdminNews(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.news,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось обновить новость'));
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: deleteAdminNews,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: adminQueryKeys.news,
      });
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось удалить новость'));
    },
  });

  const handleMarkMessageAsRead = async (id: number) => {
    await markMessageAsReadMutation.mutateAsync(id);
  };

  const handleDeleteMessage = async (id: number) => {
    await deleteMessageMutation.mutateAsync(id);
  };

  const handleMarkTicketRequestAsRead = async (id: number) => {
    await markTicketRequestAsReadMutation.mutateAsync(id);
  };

  const handleDeleteTicketRequest = async (id: number) => {
    await deleteTicketRequestMutation.mutateAsync(id);
  };

  const handleCreatePlayer = async (payload: PlayerPayload) => {
    await createPlayerMutation.mutateAsync(payload);
  };

  const handleUpdatePlayer = async (id: number, payload: PlayerPayload) => {
    await updatePlayerMutation.mutateAsync({
      id,
      payload,
    });
  };

  const handleDeletePlayer = async (id: number) => {
    await deletePlayerMutation.mutateAsync(id);
  };

  const handleCreateScheduleEvent = async (payload: ScheduleEventPayload) => {
    await createScheduleEventMutation.mutateAsync(payload);
  };

  const handleUpdateScheduleEvent = async (
    id: number,
    payload: ScheduleEventPayload,
  ) => {
    await updateScheduleEventMutation.mutateAsync({
      id,
      payload,
    });
  };

  const handleDeleteScheduleEvent = async (id: number) => {
    await deleteScheduleEventMutation.mutateAsync(id);
  };

  const handleCreateNews = async (payload: NewsPayload) => {
    await createNewsMutation.mutateAsync(payload);
  };

  const handleUpdateNews = async (id: number, payload: NewsPayload) => {
    await updateNewsMutation.mutateAsync({ id, payload });
  };

  const handleDeleteNews = async (id: number) => {
    await deleteNewsMutation.mutateAsync(id);
  };

  return {
    players,
    scheduleEvents,
    news,
    messages,
    ticketRequests,

    isLoading,
    loadError,

    unreadMessagesCount,
    unreadTicketRequestsCount,

    refreshAdminData,

    handleMarkMessageAsRead,
    handleDeleteMessage,

    handleMarkTicketRequestAsRead,
    handleDeleteTicketRequest,

    handleCreatePlayer,
    handleUpdatePlayer,
    handleDeletePlayer,

    handleCreateScheduleEvent,
    handleUpdateScheduleEvent,
    handleDeleteScheduleEvent,

    handleCreateNews,
    handleUpdateNews,
    handleDeleteNews,
  };
}
