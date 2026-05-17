import type { ReactElement } from 'react';

import { AboutPage } from '@pages/about';
import { AdminPage } from '@pages/admin';
import { ContactsPage } from '@pages/contacts';
import { GalleryPage } from '@pages/gallery';
import { HomePage } from '@pages/home';
import { NewsPage } from '@pages/news';
import { NotFoundPage } from '@pages/not-found';
import { SchedulePage } from '@pages/schedule';
import { StandingsPage } from '@pages/standings';
import { TeamPage } from '@pages/team';

import { LoginPage } from '@features/auth';

import { AppRoute } from '@shared/config/routes';

export type RouteConfigItem = {
  path: string;
  element: ReactElement;
  authOnly?: boolean;
};

export const publicRoutes: RouteConfigItem[] = [
  {
    path: AppRoute.home,
    element: <HomePage />,
  },
  {
    path: AppRoute.about,
    element: <AboutPage />,
  },
  {
    path: AppRoute.team,
    element: <TeamPage />,
  },
  {
    path: AppRoute.schedule,
    element: <SchedulePage />,
  },
  {
    path: AppRoute.standings,
    element: <StandingsPage />,
  },
  {
    path: AppRoute.news,
    element: <NewsPage />,
  },
  {
    path: AppRoute.gallery,
    element: <GalleryPage />,
  },
  {
    path: AppRoute.contacts,
    element: <ContactsPage />,
  },
];

export const adminRoutes: RouteConfigItem[] = [
  {
    path: AppRoute.admin,
    element: <AdminPage />,
    authOnly: true,
  },
  {
    path: `${AppRoute.admin}/:section`,
    element: <AdminPage />,
    authOnly: true,
  },
];

export const standaloneRoutes: RouteConfigItem[] = [
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
