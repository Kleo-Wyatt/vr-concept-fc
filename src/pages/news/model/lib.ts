import type { NewsItem } from './types';
import defaultNewsImage from '@shared/assets/images/news-default.png';

const ONE_MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;

export function formatNewsDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getNewsCategories(news: NewsItem[]) {
  return ['all', ...new Set(news.map((item) => item.category))];
}

export function sortNewsByDate(news: NewsItem[]) {
  return [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function isNewsOlderThanOneMonth(newsItem: NewsItem) {
  const newsDate = new Date(newsItem.date).getTime();
  const currentDate = Date.now();

  return currentDate - newsDate > ONE_MONTH_IN_MS;
}

export function getActualNews(news: NewsItem[]) {
  return sortNewsByDate(news).filter(
    (newsItem) => !isNewsOlderThanOneMonth(newsItem),
  );
}

export function getArchiveNews(news: NewsItem[]) {
  return sortNewsByDate(news).filter(isNewsOlderThanOneMonth);
}

export function getNewsImage(newsItem: NewsItem) {
  return {
    src: newsItem.image || defaultNewsImage,
    alt: newsItem.imageAlt || newsItem.title,
  };
}