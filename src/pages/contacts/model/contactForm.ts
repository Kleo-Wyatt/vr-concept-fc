import type { ContactFormData, ContactFormErrors } from './types';

export const initialContactFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export const MAX_NAME_LENGTH = 30;
export const MAX_EMAIL_LENGTH = 30;
export const MAX_PHONE_LENGTH = 20;
export const MAX_SUBJECT_LENGTH = 50;
export const MAX_MESSAGE_LENGTH = 200;

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

export function sanitizeContactFormField(
  fieldName: keyof ContactFormData,
  value: unknown,
) {
  if (fieldName === 'email') {
    return sanitizeEmail(value);
  }

  if (fieldName === 'phone') {
    return sanitizePhone(value);
  }

  if (fieldName === 'name') {
    return limitText(value, MAX_NAME_LENGTH);
  }

  if (fieldName === 'subject') {
    return limitText(value, MAX_SUBJECT_LENGTH);
  }

  if (fieldName === 'message') {
    return limitText(value, MAX_MESSAGE_LENGTH);
  }

  return String(value ?? '');
}

export function validateContactForm(formData: ContactFormData) {
  const errors: ContactFormErrors = {};

  const trimmedName = formData.name.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedPhone = formData.phone.trim();
  const trimmedMessage = formData.message.trim();

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

  if (!trimmedMessage) {
    errors.message = 'Введите сообщение';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Сообщение должно быть не короче 10 символов';
  }

  return errors;
}

export function normalizeContactForm(
  formData: ContactFormData,
): ContactFormData {
  return {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    subject: formData.subject.trim(),
    message: formData.message.trim(),
  };
}
