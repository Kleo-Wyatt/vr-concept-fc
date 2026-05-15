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
