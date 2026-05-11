import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getUnknownErrorMessage } from '@shared/lib/errors/getUnknownErrorMessage';

import {
  createAdminPlayer,
  deleteAdminPlayer,
  getAdminPlayers,
  updateAdminPlayer,
  type Player,
  type PlayerPayload,
} from '../model/playersApi';
import { adminQueryKeys } from '../model/queryKeys';

const EMPTY_PLAYERS: Player[] = [];

export function useAdminPlayers() {
  const queryClient = useQueryClient();

  const playersQuery = useQuery({
    queryKey: adminQueryKeys.players,
    queryFn: getAdminPlayers,
  });

  const invalidatePlayers = () =>
    queryClient.invalidateQueries({
      queryKey: adminQueryKeys.players,
    });

  const createPlayerMutation = useMutation({
    mutationFn: createAdminPlayer,
    onSuccess: () => {
      void invalidatePlayers();
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось добавить игрока'));
    },
  });

  const updatePlayerMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: PlayerPayload }) =>
      updateAdminPlayer(id, payload),
    onSuccess: () => {
      void invalidatePlayers();
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось обновить игрока'));
    },
  });

  const deletePlayerMutation = useMutation({
    mutationFn: deleteAdminPlayer,
    onSuccess: () => {
      void invalidatePlayers();
    },
    onError: (error) => {
      alert(getUnknownErrorMessage(error, 'Не удалось удалить игрока'));
    },
  });

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

  return {
    players: playersQuery.data ?? EMPTY_PLAYERS,
    isLoading: playersQuery.isLoading,
    error: playersQuery.error,

    handleCreatePlayer,
    handleUpdatePlayer,
    handleDeletePlayer,
  };
}
