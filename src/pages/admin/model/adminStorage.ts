import { apiRequest } from '@shared/api/http';
import { getContactMessages } from '@pages/contacts/model/contactMessagesStorage';
import { getTicketRequests } from '@pages/schedule/model/ticketRequestStorage';
import type { ContactMessage } from '@pages/contacts/model/types';
import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';

export function getAdminContactMessages() {
  return getContactMessages();
}

export async function markAdminContactMessageAsRead(id: number) {
  await apiRequest<ContactMessage>(`/contact-messages/${id}/read`, {
    method: 'PATCH',
  });

  return getAdminContactMessages();
}

export async function deleteAdminContactMessage(id: number) {
  await apiRequest<void>(`/contact-messages/${id}`, {
    method: 'DELETE',
  });

  return getAdminContactMessages();
}

export function getAdminTicketRequests() {
  return getTicketRequests();
}

export async function markAdminTicketRequestAsRead(id: number) {
  await apiRequest<TicketRequest>(`/ticket-requests/${id}/read`, {
    method: 'PATCH',
  });

  return getAdminTicketRequests();
}

export async function deleteAdminTicketRequest(id: number) {
  await apiRequest<void>(`/ticket-requests/${id}`, {
    method: 'DELETE',
  });

  return getAdminTicketRequests();
}
