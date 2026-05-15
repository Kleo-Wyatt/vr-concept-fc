import { apiRequest } from '@shared/api/http';

import type { NewsItem, NewsPayload } from '../model/types';

export function getNews() {
  return apiRequest<NewsItem[]>('/news');
}

export function getFeaturedNews() {
  return apiRequest<NewsItem>('/news/featured');
}

export function createNews(payload: NewsPayload) {
  return apiRequest<NewsItem>('/news', {
    method: 'POST',
    body: payload,
  });
}

export function updateNews(id: number, payload: NewsPayload) {
  return apiRequest<NewsItem>(`/news/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteNews(id: number) {
  return apiRequest<void>(`/news/${id}`, {
    method: 'DELETE',
  });
}
