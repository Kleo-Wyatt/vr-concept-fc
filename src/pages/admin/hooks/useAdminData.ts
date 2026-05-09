import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ContactMessage } from '@pages/contacts/model/types';
import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';

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

async function loadAdminData() {
  const [messages, ticketRequests, players] = await Promise.all([
    getAdminContactMessages(),
    getAdminTicketRequests(),
    getAdminPlayers(),
  ]);

  return {
    messages,
    ticketRequests,
    players,
  };
}

export function useAdminData() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [ticketRequests, setTicketRequests] = useState<TicketRequest[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const unreadMessagesCount = useMemo(
    () => messages.filter((message) => !message.read).length,
    [messages],
  );

  const unreadTicketRequestsCount = useMemo(
    () => ticketRequests.filter((request) => !request.read).length,
    [ticketRequests],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadInitialAdminData() {
      try {
        const nextData = await loadAdminData();

        if (!isMounted) {
          return;
        }

        setMessages(nextData.messages);
        setTicketRequests(nextData.ticketRequests);
        setPlayers(nextData.players);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : 'Не удалось загрузить данные админ-панели',
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialAdminData();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshAdminData = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');

    try {
      const nextData = await loadAdminData();

      setMessages(nextData.messages);
      setTicketRequests(nextData.ticketRequests);
      setPlayers(nextData.players);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : 'Не удалось загрузить данные админ-панели',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMarkMessageAsRead = async (id: number) => {
    try {
      const nextMessages = await markAdminContactMessageAsRead(id);

      setMessages(nextMessages);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Не удалось обновить сообщение',
      );
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      const nextMessages = await deleteAdminContactMessage(id);

      setMessages(nextMessages);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось удалить сообщение',
      );
    }
  };

  const handleMarkTicketRequestAsRead = async (id: number) => {
    try {
      const nextRequests = await markAdminTicketRequestAsRead(id);

      setTicketRequests(nextRequests);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось обновить заявку',
      );
    }
  };

  const handleDeleteTicketRequest = async (id: number) => {
    try {
      const nextRequests = await deleteAdminTicketRequest(id);

      setTicketRequests(nextRequests);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось удалить заявку',
      );
    }
  };

  const handleCreatePlayer = async (payload: PlayerPayload) => {
    await createAdminPlayer(payload);

    const nextPlayers = await getAdminPlayers();

    setPlayers(nextPlayers);
  };

  const handleUpdatePlayer = async (id: number, payload: PlayerPayload) => {
    await updateAdminPlayer(id, payload);

    const nextPlayers = await getAdminPlayers();

    setPlayers(nextPlayers);
  };

  const handleDeletePlayer = async (id: number) => {
    await deleteAdminPlayer(id);

    const nextPlayers = await getAdminPlayers();

    setPlayers(nextPlayers);
  };

  return {
    players,
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
  };
}
