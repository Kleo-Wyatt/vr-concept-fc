import type { TicketRequestFormData } from './ticketRequestStorage';

export const MAX_NAME_LENGTH = 30;
export const MAX_EMAIL_LENGTH = 30;
export const MAX_PHONE_LENGTH = 20;
export const MAX_COMMENT_LENGTH = 200;
export const MAX_TICKET_COUNT = 10;

const EMAIL_REGEXP = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEXP = /^\+?[\d\s()-]{7,20}$/;

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

export function sanitizeTicketRequestField<
  FieldName extends keyof TicketRequestFormData,
>(fieldName: FieldName, value: unknown): TicketRequestFormData[FieldName] {
  if (fieldName === 'ticketCount') {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return 1 as TicketRequestFormData[FieldName];
    }

    const normalizedValue = Math.trunc(numericValue);

    return Math.min(
      Math.max(normalizedValue, 1),
      MAX_TICKET_COUNT,
    ) as TicketRequestFormData[FieldName];
  }

  return String(value ?? '') as TicketRequestFormData[FieldName];
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
  } else if (trimmedName.length > MAX_NAME_LENGTH) {
    errors.name = `Имя должно быть не длиннее ${MAX_NAME_LENGTH} символов`;
  }

  if (!trimmedEmail) {
    errors.email = 'Введите email';
  } else if (!EMAIL_REGEXP.test(trimmedEmail)) {
    errors.email = 'Введите корректный email';
  } else if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email должен быть не длиннее ${MAX_EMAIL_LENGTH} символов`;
  }

  if (trimmedPhone && !PHONE_REGEXP.test(trimmedPhone)) {
    errors.phone = 'Введите корректный телефон';
  } else if (trimmedPhone.length > MAX_PHONE_LENGTH) {
    errors.phone = `Телефон должен быть не длиннее ${MAX_PHONE_LENGTH} символов`;
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
