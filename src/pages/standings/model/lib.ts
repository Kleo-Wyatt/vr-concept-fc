import type { StandingsTeam, StandingsTeamSource } from './types';

export function formatGoalDifference(goalDifference: number) {
  if (goalDifference > 0) {
    return `+${goalDifference}`;
  }

  return String(goalDifference);
}

export function calculateStandings(
  teams: StandingsTeamSource[],
): StandingsTeam[] {
  return teams
    .map((team) => {
      const played = team.wins + team.draws + team.losses;
      const goalDifference = team.goalsFor - team.goalsAgainst;
      const points = team.wins * 3 + team.draws;

      return {
        ...team,
        played,
        goalDifference,
        points,
      };
    })
    .sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }

      if (b.goalsFor !== a.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }

      return a.teamName.localeCompare(b.teamName, 'ru');
    })
    .map((team, index) => ({
      ...team,
      position: index + 1,
    }));
}

export function getTeamMetrics(standings: StandingsTeam[], teamName: string) {
  const team = standings.find((item) => item.teamName === teamName);

  if (!team) {
    return [];
  }

  return [
    {
      value: String(team.position),
      label: 'Место в таблице',
      note: team.position === 1 ? 'Лидирует в чемпионате' : 'Текущая позиция',
    },
    {
      value: String(team.played),
      label: 'Сыграно матчей',
      note: 'В текущем сезоне',
    },
    {
      value: `${team.wins}-${team.draws}-${team.losses}`,
      label: 'Баланс матчей',
      note: 'Победы — ничьи — поражения',
    },
    {
      value: `${team.goalsFor}:${team.goalsAgainst}`,
      label: 'Соотношение голов',
      note: 'Забито : пропущено',
    },
  ];
}
