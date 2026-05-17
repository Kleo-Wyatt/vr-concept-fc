import { lazy } from 'react';

export const GalleryPageAsync = lazy(() =>
  import('./GalleryPage').then((module) => ({
    default: module.GalleryPage,
  })),
);
