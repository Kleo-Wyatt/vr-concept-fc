import type { FormEvent } from 'react';
import { useState } from 'react';

import { Modal } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type { UpcomingMatch } from '../../model/types';
import {
  initialTicketRequestFormData,
  normalizeTicketRequestForm,
  sanitizeTicketRequestField,
  validateTicketRequestForm,
  type TicketRequestFormErrors,
} from '../../model/ticketRequestForm';
import {
  saveTicketRequest,
  type TicketRequestFormData,
} from '../../model/ticketRequestStorage';

import { TicketRequestForm } from './TicketRequestForm';
import { TicketRequestSuccess } from './TicketRequestSuccess';

import styles from './TicketRequestModal.module.css';

type TicketRequestModalProps = {
  match: UpcomingMatch;
  open: boolean;
  onClose: () => void;
};

export function TicketRequestModal({
  match,
  open,
  onClose,
}: TicketRequestModalProps) {
  const [formData, setFormData] = useState<TicketRequestFormData>(
    initialTicketRequestFormData,
  );
  const [errors, setErrors] = useState<TicketRequestFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const matchTitle = `${match.homeTeam} — ${match.awayTeam}`;

  const handleClose = () => {
    setFormData(initialTicketRequestFormData);
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  const handleChange = (event: FormFieldChangeEvent) => {
    const { name, value } = event.target;
    const fieldName = name as keyof TicketRequestFormData;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: sanitizeTicketRequestField(fieldName, value),
    }));

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateTicketRequestForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    saveTicketRequest({
      ...normalizeTicketRequestForm(formData),
      matchTitle,
      matchDate: match.date,
      matchTime: match.time,
      location: match.location,
    });

    setIsSubmitted(true);
  };

  return (
    <Modal
      open={open}
      width={600}
      title="Заявка на билет"
      onCancel={handleClose}
      footer={null}
    >
      {isSubmitted ? (
        <TicketRequestSuccess onClose={handleClose} />
      ) : (
        <>
          <div className={styles.matchInfo}>
            <h3 title={matchTitle}>{matchTitle}</h3>
            <p>
              {match.date} в {match.time}
            </p>
            <p>{match.location}</p>
          </div>

          <TicketRequestForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </>
      )}
    </Modal>
  );
}
