import { AppRoute } from '@shared/config/routes';

import type { AdminSection } from './types';

const adminSectionByPathParam: Record<string, AdminSection> = {
  dashboard: 'dashboard',
  players: 'players',
  schedule: 'schedule',
  news: 'news',
  messages: 'messages',
  tickets: 'tickets',
};

const adminSectionPathBySection: Record<AdminSection, string> = {
  dashboard: AppRoute.admin,
  players: `${AppRoute.admin}/players`,
  schedule: `${AppRoute.admin}/schedule`,
  news: `${AppRoute.admin}/news`,
  messages: `${AppRoute.admin}/messages`,
  tickets: `${AppRoute.admin}/tickets`,
};

export function getAdminSectionFromParam(section?: string): AdminSection {
  if (!section) {
    return 'dashboard';
  }

  return adminSectionByPathParam[section] ?? 'dashboard';
}

export function isAdminSectionPathParam(section?: string) {
  return !section || section in adminSectionByPathParam;
}

export function getAdminSectionPath(section: AdminSection) {
  return adminSectionPathBySection[section];
}
