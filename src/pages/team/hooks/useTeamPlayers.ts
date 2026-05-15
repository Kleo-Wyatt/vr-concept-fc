import { useQuery } from '@tanstack/react-query';

import { getPlayers, playerQueryKeys, type Player } from '@entities/player';

const EMPTY_PLAYERS: Player[] = [];

export function useTeamPlayers() {
  const query = useQuery({
    queryKey: playerQueryKeys.all,
    queryFn: getPlayers,
  });

  return {
    players: query.data ?? EMPTY_PLAYERS,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
