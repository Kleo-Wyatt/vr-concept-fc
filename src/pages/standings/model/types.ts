export type StandingsTeamSource = {
  id: number;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

export type StandingsTeam = StandingsTeamSource & {
  position: number;
  played: number;
  goalDifference: number;
  points: number;
};

export type InfoCard = {
  title: string;
  items: string[];
};

export type TeamMetric = {
  value: string;
  label: string;
  note: string;
};

export type GoalItem = {
  icon: string;
  title: string;
  description: string;
};
