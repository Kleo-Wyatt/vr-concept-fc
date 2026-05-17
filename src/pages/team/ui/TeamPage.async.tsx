import { lazy } from 'react';

export const TeamPageAsync = lazy(() =>
  import('./TeamPage').then((module) => ({
    default: module.TeamPage,
  })),
);
