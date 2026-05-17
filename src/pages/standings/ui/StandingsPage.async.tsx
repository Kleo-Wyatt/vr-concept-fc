import { lazy } from 'react';

export const StandingsPageAsync = lazy(() =>
  import('./StandingsPage').then((module) => ({
    default: module.StandingsPage,
  })),
);
