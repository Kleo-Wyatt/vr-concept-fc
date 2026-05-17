import { getAdminLoadError } from '../lib/getAdminLoadError';

import { useAdminPlayers } from '@features/manage-player';
import { useAdminScheduleEvents } from '@features/manage-schedule-event';
import { useAdminNews } from '@features/manage-news';
import { useAdminMessages } from '@widgets/admin-section-content';
import { useAdminTicketRequests } from '@widgets/admin-section-content';
import { useRefreshAdminData } from './useRefreshAdminData';

export function useAdminData() {
  const playersData = useAdminPlayers();
  const scheduleEventsData = useAdminScheduleEvents();
  const newsData = useAdminNews();
  const messagesData = useAdminMessages();
  const ticketRequestsData = useAdminTicketRequests();

  const refreshAdminData = useRefreshAdminData();

  const isLoading =
    playersData.isLoading ||
    scheduleEventsData.isLoading ||
    newsData.isLoading ||
    messagesData.isLoading ||
    ticketRequestsData.isLoading;

  const loadError = getAdminLoadError([
    playersData.error,
    scheduleEventsData.error,
    newsData.error,
    messagesData.error,
    ticketRequestsData.error,
  ]);

  return {
    players: playersData.players,
    scheduleEvents: scheduleEventsData.scheduleEvents,
    news: newsData.news,
    messages: messagesData.messages,
    ticketRequests: ticketRequestsData.ticketRequests,

    isLoading,
    loadError,

    unreadMessagesCount: messagesData.unreadMessagesCount,
    unreadTicketRequestsCount: ticketRequestsData.unreadTicketRequestsCount,

    refreshAdminData,

    handleMarkMessageAsRead: messagesData.handleMarkMessageAsRead,
    handleDeleteMessage: messagesData.handleDeleteMessage,

    handleMarkTicketRequestAsRead:
      ticketRequestsData.handleMarkTicketRequestAsRead,
    handleDeleteTicketRequest: ticketRequestsData.handleDeleteTicketRequest,

    handleCreatePlayer: playersData.handleCreatePlayer,
    handleUpdatePlayer: playersData.handleUpdatePlayer,
    handleDeletePlayer: playersData.handleDeletePlayer,

    handleCreateScheduleEvent: scheduleEventsData.handleCreateScheduleEvent,
    handleUpdateScheduleEvent: scheduleEventsData.handleUpdateScheduleEvent,
    handleDeleteScheduleEvent: scheduleEventsData.handleDeleteScheduleEvent,

    handleCreateNews: newsData.handleCreateNews,
    handleUpdateNews: newsData.handleUpdateNews,
    handleDeleteNews: newsData.handleDeleteNews,
  };
}
