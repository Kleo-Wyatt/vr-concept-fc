import { apiRequest } from '@shared/api/http';

export type AdminNewsItem = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
};

export type NewsPayload = Omit<AdminNewsItem, 'id'>;

export function getAdminNews() {
  return apiRequest<AdminNewsItem[]>('/news');
}

export function createAdminNews(payload: NewsPayload) {
  return apiRequest<AdminNewsItem>('/news', {
    method: 'POST',
    body: payload,
  });
}

export function updateAdminNews(id: number, payload: NewsPayload) {
  return apiRequest<AdminNewsItem>(`/news/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteAdminNews(id: number) {
  return apiRequest<void>(`/news/${id}`, {
    method: 'DELETE',
  });
}
