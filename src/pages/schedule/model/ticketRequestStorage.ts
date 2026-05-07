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

const STORAGE_KEY = 'vrfc_ticket_requests';

export function getTicketRequests(): TicketRequest[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return [];
    }

    const parsedValue = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue;
  } catch {
    return [];
  }
}

export function saveTicketRequest(
  payload: CreateTicketRequestPayload,
): TicketRequest {
  const request: TicketRequest = {
    ...payload,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    read: false,
  };

  const requests = getTicketRequests();

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...requests, request]));

  return request;
}
