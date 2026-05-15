import { apiRequest } from '@shared/api/http';

import type { CreateTicketRequestPayload, TicketRequest } from '../model/types';

export function getTicketRequests() {
  return apiRequest<TicketRequest[]>('/ticket-requests');
}

export function saveTicketRequest(payload: CreateTicketRequestPayload) {
  return apiRequest<TicketRequest>('/ticket-requests', {
    method: 'POST',
    body: payload,
  });
}

export function markTicketRequestAsRead(id: number) {
  return apiRequest<TicketRequest>(`/ticket-requests/${id}/read`, {
    method: 'PATCH',
  });
}

export function deleteTicketRequest(id: number) {
  return apiRequest<void>(`/ticket-requests/${id}`, {
    method: 'DELETE',
  });
}
