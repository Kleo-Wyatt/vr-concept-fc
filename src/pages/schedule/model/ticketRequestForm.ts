import type { TicketRequestFormData } from './ticketRequestStorage';

export type TicketRequestFormErrors = Partial<
  Record<keyof TicketRequestFormData, string>
>;

export const initialTicketRequestFormData: TicketRequestFormData = {
  name: '',
  email: '',
  phone: '',
  ticketCount: 1,
  comment: '',
};

export const MAX_NAME_LENGTH = 60;
export const MAX_EMAIL_LENGTH = 80;
export const MAX_PHONE_LENGTH = 20;
export const MAX_COMMENT_LENGTH = 300;
export const MAX_TICKET_COUNT = 10;

const EMAIL_REGEXP = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEXP = /^\+?[\d\s()-]{7,20}$/;

function limitText(value: unknown, maxLength: number) {
  return String(value ?? '').slice(0, maxLength);
}

function sanitizeEmail(value: unknown) {
  return String(value ?? '')
    .replace(/[^a-zA-Z0-9@._+-]/g, '')
    .slice(0, MAX_EMAIL_LENGTH);
}

function sanitizePhone(value: unknown) {
  const cleanedValue = String(value ?? '')
    .replace(/[^\d+()\s-]/g, '')
    .slice(0, MAX_PHONE_LENGTH);

  const startsWithPlus = cleanedValue.trimStart().startsWith('+');
  const valueWithoutPlus = cleanedValue.replace(/\+/g, '');

  return startsWithPlus ? `+${valueWithoutPlus.trimStart()}` : valueWithoutPlus;
}

function sanitizeTicketCount(value: unknown) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 1;
  }

  return Math.min(Math.max(Math.trunc(numericValue), 1), MAX_TICKET_COUNT);
}

export function sanitizeTicketRequestField(
  fieldName: keyof TicketRequestFormData,
  value: unknown,
) {
  if (fieldName === 'ticketCount') {
    return sanitizeTicketCount(value);
  }

  if (fieldName === 'phone') {
    return sanitizePhone(value);
  }

  if (fieldName === 'email') {
    return sanitizeEmail(value);
  }

  if (fieldName === 'name') {
    return limitText(value, MAX_NAME_LENGTH);
  }

  if (fieldName === 'comment') {
    return limitText(value, MAX_COMMENT_LENGTH);
  }

  return String(value ?? '');
}

export function validateTicketRequestForm(formData: TicketRequestFormData) {
  const errors: TicketRequestFormErrors = {};

  const trimmedName = formData.name.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedPhone = formData.phone.trim();
  const trimmedComment = formData.comment.trim();

  if (!trimmedName) {
    errors.name = 'Введите имя';
  } else if (trimmedName.length < 2) {
    errors.name = 'Имя должно быть не короче 2 символов';
  }

  if (!trimmedEmail) {
    errors.email = 'Введите email';
  } else if (!EMAIL_REGEXP.test(trimmedEmail)) {
    errors.email = 'Введите корректный email латинскими символами';
  }

  if (trimmedPhone && !PHONE_REGEXP.test(trimmedPhone)) {
    errors.phone = 'Введите корректный телефон';
  }

  if (!Number.isInteger(formData.ticketCount)) {
    errors.ticketCount = 'Количество билетов должно быть целым числом';
  } else if (formData.ticketCount < 1) {
    errors.ticketCount = 'Минимум 1 билет';
  } else if (formData.ticketCount > MAX_TICKET_COUNT) {
    errors.ticketCount = `Максимум ${MAX_TICKET_COUNT} билетов в одной заявке`;
  }

  if (trimmedComment.length > MAX_COMMENT_LENGTH) {
    errors.comment = `Комментарий должен быть не длиннее ${MAX_COMMENT_LENGTH} символов`;
  }

  return errors;
}

export function normalizeTicketRequestForm(formData: TicketRequestFormData) {
  return {
    ...formData,
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    comment: formData.comment.trim(),
  };
}
