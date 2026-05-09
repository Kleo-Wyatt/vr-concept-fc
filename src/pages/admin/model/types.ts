export type AdminSection = 'dashboard' | 'players' | 'messages' | 'tickets';

export type AdminNavItem = {
  id: AdminSection;
  label: string;
  icon: string;
};
