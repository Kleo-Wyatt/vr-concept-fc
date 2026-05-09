import { useQuery } from '@tanstack/react-query';

import { getTeamPlayers, type TeamPlayer } from '../model/playersApi';
import { teamQueryKeys } from '../model/queryKeys';

const EMPTY_PLAYERS: TeamPlayer[] = [];

export function useTeamPlayers() {
  const query = useQuery({
    queryKey: teamQueryKeys.players,
    queryFn: getTeamPlayers,
  });

  return {
    players: query.data ?? EMPTY_PLAYERS,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
