export type AdminSection =
  | 'dashboard'
  | 'players'
  | 'schedule'
  | 'messages'
  | 'tickets';

export type AdminNavItem = {
  id: AdminSection;
  label: string;
  icon: string;
};
