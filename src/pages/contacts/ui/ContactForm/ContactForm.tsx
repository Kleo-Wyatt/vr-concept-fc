import type { FormEvent } from 'react';
import { useState } from 'react';

import { Button, Card, FormField } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import {
  initialContactFormData,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_SUBJECT_LENGTH,
  normalizeContactForm,
  sanitizeContactFormField,
  validateContactForm,
} from '../../model/contactForm';
import { saveContactMessage } from '../../model/contactMessagesStorage';
import type { ContactFormData, ContactFormErrors } from '../../model/types';

import styles from './ContactForm.module.css';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(
    initialContactFormData,
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: FormFieldChangeEvent) => {
    const { name, value } = event.target;
    const fieldName = name as keyof ContactFormData;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: sanitizeContactFormField(fieldName, value),
    }));

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: undefined,
    }));

    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsSubmitted(false);
      return;
    }

    saveContactMessage(normalizeContactForm(formData));

    setFormData(initialContactFormData);
    setErrors({});
    setIsSubmitted(true);

    window.setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <Card className={styles.formCard}>
      <h3 className={styles.title}>Форма обратной связи</h3>
      <p className={styles.description}>
        Напишите нам, если у вас есть вопросы или предложения
      </p>

      {isSubmitted && (
        <div className={styles.success}>
          ✓ Спасибо! Ваше сообщение отправлено
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField
          label="Ваше имя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Иван Петров"
          error={errors.name}
          maxLength={MAX_NAME_LENGTH}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="ivan@example.com"
          error={errors.email}
          maxLength={MAX_EMAIL_LENGTH}
        />

        <FormField
          label="Телефон"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 123-45-67"
          error={errors.phone}
          maxLength={MAX_PHONE_LENGTH}
        />

        <FormField
          label="Тема"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="О чем вы пишете?"
          error={errors.subject}
          maxLength={MAX_SUBJECT_LENGTH}
        />

        <FormField
          label="Сообщение"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Введите ваше сообщение здесь..."
          error={errors.message}
          maxLength={MAX_MESSAGE_LENGTH}
        />
        <Button type="submit" size="small">
          Отправить сообщение
        </Button>
      </form>
    </Card>
  );
}
