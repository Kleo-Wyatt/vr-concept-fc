export const AppRoute = {
  home: '/',
  about: '/about',
  team: '/team',
  schedule: '/schedule',
  standings: '/standings',
  news: '/news',
  gallery: '/gallery',
  contacts: '/contacts',
  admin: '/admin',
} as const;

export type AppRouteKey = keyof typeof AppRoute;
export type AppRoutePath = (typeof AppRoute)[AppRouteKey];

export const navigationItems = [
  {
    path: AppRoute.home,
    label: 'Главная',
  },
  {
    path: AppRoute.about,
    label: 'О команде',
  },
  {
    path: AppRoute.team,
    label: 'Состав',
  },
  {
    path: AppRoute.schedule,
    label: 'Расписание',
  },
  {
    path: AppRoute.standings,
    label: 'Таблица',
  },
  {
    path: AppRoute.news,
    label: 'Новости',
  },
  {
    path: AppRoute.gallery,
    label: 'Галерея',
  },
  {
    path: AppRoute.contacts,
    label: 'Контакты',
  },
] as const;
