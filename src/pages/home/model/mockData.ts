import type { HomeStat, NewsItem, Player, UpcomingMatch } from './types';

export const homePlayers: Player[] = [
  {
    id: 1,
    number: 1,
    name: 'Иван Петров',
    position: 'Вратарь',
    image: '👨‍🔬',
    bio: 'Опытный вратарь с 10-летним стажем',
    height: '188',
    weight: '82',
  },
  {
    id: 2,
    number: 2,
    name: 'Сергей Сидоров',
    position: 'Защитник',
    image: '🧑‍💼',
    bio: 'Капитан команды, лидер на поле',
    height: '182',
    weight: '78',
  },
  {
    id: 3,
    number: 4,
    name: 'Алексей Морозов',
    position: 'Полузащитник',
    image: '🧑‍🎨',
    bio: 'Творческий полузащитник, автор ассистов',
    height: '176',
    weight: '72',
  },
  {
    id: 4,
    number: 10,
    name: 'Михаил Орлов',
    position: 'Нападающий',
    image: '⚡',
    bio: 'Лучший бомбардир команды',
    height: '180',
    weight: '76',
  },
];

export const homeNews: NewsItem[] = [
  {
    id: 1,
    title: 'Великая победа над TECH United!',
    excerpt:
      'Наша команда одержала уверенную победу 2:1 в матче против TECH United.',
    date: '2026-05-15',
    category: 'Матч',
    author: 'Администратор',
    image: '⚽',
  },
  {
    id: 2,
    title: 'Тренировочный лагерь в июне',
    excerpt:
      'Объявляем о проведении интенсивного тренировочного лагеря для подготовки к турниру.',
    date: '2026-05-10',
    category: 'Новости',
    author: 'Администратор',
    image: '📋',
  },
  {
    id: 3,
    title: 'Новый спонсор присоединился к клубу',
    excerpt:
      'Компания DataTech стала официальным партнером футбольной команды.',
    date: '2026-05-05',
    category: 'Клуб',
    author: 'Администратор',
    image: '🤝',
  },
];

export const upcomingMatch: UpcomingMatch = {
  date: '2026-05-23',
  time: '16:30',
  homeTeam: 'VR CONCEPT FC',
  awayTeam: 'Digital FC',
  location: 'Стадион «Луч»',
  tournament: 'Чемпионат',
};

export const homeStats: HomeStat[] = [
  {
    value: '18',
    label: 'Игроков',
  },
  {
    value: '12',
    label: 'Матчей',
  },
  {
    value: '8',
    label: 'Побед',
  },
  {
    value: '27',
    label: 'Забито голов',
  },
];
