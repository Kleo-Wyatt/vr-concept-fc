import type { GalleryItem } from './types';

const unavailablePhoto = '/images/gallery/photo-unavailable.png';

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Матч против TECH United',
    description: 'Наша команда в атаке',
    image: unavailablePhoto,
    category: 'Матчи',
    date: '2026-05-15',
  },
  {
    id: 2,
    title: 'Тренировка на поле',
    description: 'Работа над техникой',
    image: unavailablePhoto,
    category: 'Тренировки',
    date: '2026-05-10',
  },
  {
    id: 3,
    title: 'Команда на стадионе',
    description: 'Полный состав перед матчем',
    image: unavailablePhoto,
    category: 'Матчи',
    date: '2026-04-28',
  },
  {
    id: 4,
    title: 'Победное торжество',
    description: 'Празднование после победы 3:0',
    image: unavailablePhoto,
    category: 'События',
    date: '2026-04-12',
  },
  {
    id: 5,
    title: 'Фитнес-подготовка',
    description: 'Тренировки в спортзале',
    image: unavailablePhoto,
    category: 'Тренировки',
    date: '2026-03-24',
  },
  {
    id: 6,
    title: 'Презентация спонсора',
    description: 'Встреча с представителями DataTech',
    image: unavailablePhoto,
    category: 'События',
    date: '2025-11-18',
  },
  {
    id: 7,
    title: 'Молодежный турнир',
    description: 'Резерв команды играет',
    image: unavailablePhoto,
    category: 'Матчи',
    date: '2025-09-07',
  },
  {
    id: 8,
    title: 'Медицинский осмотр',
    description: 'Обязательное медобследование игроков',
    image: unavailablePhoto,
    category: 'Клуб',
    date: '2025-08-22',
  },
];
