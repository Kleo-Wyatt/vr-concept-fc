import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPlayer,
  deletePlayer,
  getPlayers,
  playerQueryKeys,
  updatePlayer,
  type Player,
  type PlayerPayload,
} from '@entities/player';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

const EMPTY_PLAYERS: Player[] = [];

export function useAdminPlayers() {
  const queryClient = useQueryClient();

  const playersQuery = useQuery({
    queryKey: playerQueryKeys.all,
    queryFn: getPlayers,
  });

  const invalidatePlayers = () =>
    queryClient.invalidateQueries({
      queryKey: playerQueryKeys.all,
    });

  const createPlayerMutation = useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      void invalidatePlayers();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось добавить игрока');
    },
  });

  const updatePlayerMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: PlayerPayload }) =>
      updatePlayer(id, payload),
    onSuccess: () => {
      void invalidatePlayers();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить игрока');
    },
  });

  const deletePlayerMutation = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      void invalidatePlayers();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось удалить игрока');
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
