export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactMessage = ContactFormData & {
  id: number;
  date: string;
  read: boolean;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
