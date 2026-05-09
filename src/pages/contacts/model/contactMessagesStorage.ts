import { apiRequest } from '@shared/api/http';

import type { ContactFormData, ContactMessage } from './types';

export function getContactMessages() {
  return apiRequest<ContactMessage[]>('/contact-messages');
}

export function saveContactMessage(payload: ContactFormData) {
  return apiRequest<ContactMessage>('/contact-messages', {
    method: 'POST',
    body: payload,
  });
}
