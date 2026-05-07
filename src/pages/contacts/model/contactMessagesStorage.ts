import type { ContactFormData, ContactMessage } from './types';

const STORAGE_KEY = 'vrfc_messages';

export function getContactMessages(): ContactMessage[] {
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

export function saveContactMessage(payload: ContactFormData): ContactMessage {
  const message: ContactMessage = {
    id: Date.now(),
    ...payload,
    date: new Date().toISOString(),
    read: false,
  };

  const messages = getContactMessages();

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, message]));

  return message;
}
