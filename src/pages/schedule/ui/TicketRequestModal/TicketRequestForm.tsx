import type { FormEvent } from 'react';

import { Button, FormField } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import {
  MAX_COMMENT_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_TICKET_COUNT,
  type TicketRequestFormErrors,
} from '../../model/ticketRequestForm';
import type { TicketRequestFormData } from '../../model/ticketRequestStorage';

import styles from './TicketRequestModal.module.css';

type TicketRequestFormProps = {
  formData: TicketRequestFormData;
  errors: TicketRequestFormErrors;
  onChange: (event: FormFieldChangeEvent) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export function TicketRequestForm({
  formData,
  errors,
  onChange,
  onSubmit,
  onCancel,
}: TicketRequestFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <FormField
        label="Имя"
        name="name"
        value={formData.name}
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
        placeholder="+7 (999) 123-45-67"
        error={errors.phone}
        maxLength={MAX_PHONE_LENGTH}
      />

      <FormField
        label="Количество билетов"
        name="ticketCount"
        type="number"
        value={formData.ticketCount}
        onChange={onChange}
        required
        placeholder="1"
        error={errors.ticketCount}
        min={1}
        max={MAX_TICKET_COUNT}
      />

      <FormField
        label="Комментарий"
        name="comment"
        type="textarea"
        value={formData.comment}
        onChange={onChange}
        placeholder="Например: хочу 2 места рядом"
        error={errors.comment}
        maxLength={MAX_COMMENT_LENGTH}
      />

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel}>
          Отмена
        </Button>

        <Button type="submit">Отправить заявку</Button>
      </div>
    </form>
  );
}
