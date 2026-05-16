import { Button, FormField, Modal } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type { ScheduleEventPayload } from '@entities/schedule-event';

import { statusOptions } from './scheduleEventForm';

import styles from './AdminScheduleEvents.module.css';

type ScheduleEventFormModalProps = {
  open: boolean;
  isEditing: boolean;
  formData: ScheduleEventPayload;
  formError: string;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (event: FormFieldChangeEvent) => void;
};

export function ScheduleEventFormModal({
  open,
  isEditing,
  formData,
  formError,
  isSaving,
  onClose,
  onSubmit,
  onChange,
}: ScheduleEventFormModalProps) {
  return (
    <Modal
      open={open}
      title={isEditing ? 'Редактировать событие' : 'Добавить событие'}
      width={680}
      footer={null}
      onCancel={onClose}
    >
      <div className={styles.form}>
        {formError && <div className={styles.errorBox}>{formError}</div>}

        <div className={styles.formGridTwo}>
          <FormField
            label="Дата"
            name="date"
            value={formData.date}
            onChange={onChange}
            required
            placeholder="2026-06-19"
          />

          <FormField
            label="Время"
            name="time"
            value={formData.time}
            onChange={onChange}
            required
            placeholder="18:30"
          />
        </div>

        <FormField
          label="Статус"
          name="status"
          type="select"
          value={formData.status}
          onChange={onChange}
          required
          options={statusOptions}
        />

        {formData.status !== 'training' && (
          <div className={styles.formGridTwo}>
            <FormField
              label="Домашняя команда"
              name="homeTeam"
              value={formData.homeTeam}
              onChange={onChange}
              required
              placeholder="VR CONCEPT FC"
            />

            <FormField
              label="Гостевая команда"
              name="awayTeam"
              value={formData.awayTeam}
              onChange={onChange}
              required
              placeholder="Digital FC"
            />
          </div>
        )}

        {formData.status === 'finished' && (
          <div className={styles.formGridTwo}>
            <FormField
              label="Голы дома"
              name="homeScore"
              type="number"
              value={formData.homeScore}
              onChange={onChange}
              min={0}
              required
            />

            <FormField
              label="Голы в гостях"
              name="awayScore"
              type="number"
              value={formData.awayScore}
              onChange={onChange}
              min={0}
              required
            />
          </div>
        )}

        <FormField
          label="Место"
          name="location"
          value={formData.location}
          onChange={onChange}
          required
          placeholder="Стадион «Луч»"
        />

        <FormField
          label="Турнир / тип события"
          name="tournament"
          value={formData.tournament}
          onChange={onChange}
          required
          placeholder="Чемпионат"
        />

        <div className={styles.modalActions}>
          <Button variant="ghost" onClick={onClose} disabled={isSaving}>
            Отмена
          </Button>

          <Button onClick={onSubmit} disabled={isSaving}>
            {isSaving ? 'Сохраняем...' : 'Сохранить'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
