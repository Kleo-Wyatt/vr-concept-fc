import { apiRequest } from '@shared/api/http';

import type { ContactFormData, ContactMessage } from '../model/types';

export function getContactMessages() {
  return apiRequest<ContactMessage[]>('/contact-messages');
}

export function saveContactMessage(payload: ContactFormData) {
  return apiRequest<ContactMessage>('/contact-messages', {
    method: 'POST',
    body: payload,
  });
}

export function markContactMessageAsRead(id: number) {
  return apiRequest<ContactMessage>(`/contact-messages/${id}/read`, {
    method: 'PATCH',
  });
}

export function deleteContactMessage(id: number) {
  return apiRequest<void>(`/contact-messages/${id}`, {
    method: 'DELETE',
  });
}
