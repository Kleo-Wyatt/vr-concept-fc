import { apiRequest } from '@shared/api/http';
import { getContactMessages } from '@pages/contacts/model/contactMessagesStorage';
import { getTicketRequests } from '@features/ticket-request';
import type { ContactMessage } from '@pages/contacts/model/types';
import type { TicketRequest } from '@features/ticket-request';

export function getAdminContactMessages() {
  return getContactMessages();
}

export function markAdminContactMessageAsRead(id: number) {
  return apiRequest<ContactMessage>(`/contact-messages/${id}/read`, {
    method: 'PATCH',
  });
}

export function deleteAdminContactMessage(id: number) {
  return apiRequest<void>(`/contact-messages/${id}`, {
    method: 'DELETE',
  });
}

export function getAdminTicketRequests() {
  return getTicketRequests();
}

export function markAdminTicketRequestAsRead(id: number) {
  return apiRequest<TicketRequest>(`/ticket-requests/${id}/read`, {
    method: 'PATCH',
  });
}

export function deleteAdminTicketRequest(id: number) {
  return apiRequest<void>(`/ticket-requests/${id}`, {
    method: 'DELETE',
  });
}
