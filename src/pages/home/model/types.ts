export type Player = {
  id: number;
  number: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  height: string;
  weight: string;
};

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  image: string;
};

export type UpcomingMatch = {
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  tournament: string;
};

export type HomeStat = {
  value: string;
  label: string;
};