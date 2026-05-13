import { apiRequest } from '@shared/api/http';

export type TicketRequestFormData = {
  name: string;
  email: string;
  phone: string;
  ticketCount: number;
  comment: string;
};

export type CreateTicketRequestPayload = TicketRequestFormData & {
  matchTitle: string;
  matchDate: string;
  matchTime: string;
  location: string;
};

export type TicketRequest = CreateTicketRequestPayload & {
  id: number;
  createdAt: string;
  read: boolean;
};

export function getTicketRequests() {
  return apiRequest<TicketRequest[]>('/ticket-requests');
}

export function saveTicketRequest(payload: CreateTicketRequestPayload) {
  return apiRequest<TicketRequest>('/ticket-requests', {
    method: 'POST',
    body: payload,
  });
}
