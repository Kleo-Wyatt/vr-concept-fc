import { lazy } from 'react';

export const NewsPageAsync = lazy(() =>
  import('./NewsPage').then((module) => ({
    default: module.NewsPage,
  })),
);
