export const playersQueryKey = ['players'] as const;
export const scheduleEventsQueryKey = ['schedule-events'] as const;

export const adminQueryKeys = {
  players: playersQueryKey,
  scheduleEvents: scheduleEventsQueryKey,
  contactMessages: ['admin', 'contact-messages'],
  ticketRequests: ['admin', 'ticket-requests'],
} as const;
