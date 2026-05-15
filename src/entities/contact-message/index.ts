export {
  deleteContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  saveContactMessage,
} from './api/contactMessageApi';

export type {
  ContactFormData,
  ContactFormErrors,
  ContactMessage,
} from './model/types';

export { contactMessageQueryKeys } from './model/contactMessageQueryKeys';
