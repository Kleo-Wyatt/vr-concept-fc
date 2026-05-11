export type AdminSection =
  | 'dashboard'
  | 'players'
  | 'schedule'
  | 'news'
  | 'messages'
  | 'tickets';

export type AdminNavItem = {
  id: AdminSection;
  label: string;
  icon: string;
};
