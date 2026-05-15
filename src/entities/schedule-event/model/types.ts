export type BaseScheduleEvent = {
  id: number;
  date: string;
  time: string;
  location: string;
  tournament: string;
};

export type UpcomingMatch = BaseScheduleEvent & {
  status: 'upcoming';
  homeTeam: string;
  awayTeam: string;
};

export type FinishedMatch = BaseScheduleEvent & {
  status: 'finished';
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
};

export type TrainingEvent = BaseScheduleEvent & {
  status: 'training';
};

export type ScheduleEvent = UpcomingMatch | FinishedMatch | TrainingEvent;

export type ScheduleStatus = ScheduleEvent['status'];

export type StatusFilter = 'all' | ScheduleStatus;

export type ScheduleEventPayload = {
  date: string;
  time: string;
  status: ScheduleStatus;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  location: string;
  tournament: string;
};
