import { apiRequest } from '@shared/api/http';

import type { NewsItem } from './types';

export function getNews() {
  return apiRequest<NewsItem[]>('/news');
}

export function getFeaturedNews() {
  return apiRequest<NewsItem>('/news/featured');
}