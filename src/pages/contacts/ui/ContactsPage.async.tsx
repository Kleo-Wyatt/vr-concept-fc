import { lazy } from 'react';

export const ContactsPageAsync = lazy(() =>
  import('./ContactsPage').then((module) => ({
    default: module.ContactsPage,
  })),
);
