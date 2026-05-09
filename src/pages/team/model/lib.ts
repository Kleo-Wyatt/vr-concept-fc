import type { TeamPlayer } from './playersApi';

export type TeamInfoItem = {
  value: string;
  label: string;
};

export function getTeamPositions(players: TeamPlayer[]) {
  return ['all', ...new Set(players.map((player) => player.position))];
}

export function filterTeamPlayers(
  players: TeamPlayer[],
  selectedPosition: string,
) {
  if (selectedPosition === 'all') {
    return players;
  }

  return players.filter((player) => player.position === selectedPosition);
}

export function getTeamInfo(players: TeamPlayer[]): TeamInfoItem[] {
  return [
    {
      value: String(players.length),
      label: 'Игроков в составе',
    },
    {
      value: String(
        players.filter((player) => player.position === 'Нападающий').length,
      ),
      label: 'Нападающих',
    },
    {
      value: String(
        players.filter((player) => player.position === 'Полузащитник').length,
      ),
      label: 'Полузащитников',
    },
    {
      value: String(
        players.filter((player) => player.position === 'Защитник').length,
      ),
      label: 'Защитников',
    },
  ];
}
