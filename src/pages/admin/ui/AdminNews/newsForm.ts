import type { AdminNewsItem, NewsPayload } from '../../model/newsApi';

export const categoryOptions = [
  'Матч',
  'Анонс',
  'Интервью',
  'Тренировки',
  'Клуб',
  'События',
];

export const initialNewsFormData: NewsPayload = {
  title: '',
  excerpt: '',
  content: '',
  date: '',
  category: 'Клуб',
  author: '',
};

export function getNewsFormData(news: AdminNewsItem): NewsPayload {
  return {
    title: news.title,
    excerpt: news.excerpt,
    content: news.content,
    date: news.date,
    category: news.category,
    author: news.author,
  };
}

export function validateNewsForm(data: NewsPayload): string {
  if (!data.title.trim()) {
    return 'Введите заголовок новости';
  }

  if (!data.content.trim()) {
    return 'Введите текст новости';
  }

  if (!data.date.trim()) {
    return 'Введите дату новости';
  }

  if (!data.category.trim()) {
    return 'Выберите категорию новости';
  }

  if (!data.author.trim()) {
    return 'Введите автора новости';
  }

  return '';
}
