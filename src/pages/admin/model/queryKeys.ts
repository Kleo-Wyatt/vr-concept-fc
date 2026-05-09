export const playersQueryKey = ['players'] as const;

export const adminQueryKeys = {
  players: playersQueryKey,
  contactMessages: ['admin', 'contact-messages'],
  ticketRequests: ['admin', 'ticket-requests'],
} as const;