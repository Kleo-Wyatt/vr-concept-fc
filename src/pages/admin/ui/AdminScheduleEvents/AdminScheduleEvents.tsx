import { useMemo, useState } from 'react';

import { Button, Card, SectionHeader } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type {
  ScheduleEvent as AdminScheduleEvent,
  ScheduleEventPayload,
  ScheduleStatus,
} from '@entities/schedule-event';

import { ScheduleEventCard } from './ScheduleEventCard';
import { ScheduleEventFormModal } from './ScheduleEventFormModal';
import {
  getEventTitle,
  getScheduleEventFormData,
  initialScheduleEventFormData,
  normalizeScheduleEventForm,
  validateScheduleEventForm,
  isScheduleEventNeedsScore,
  isPastTrainingEvent,
} from './scheduleEventForm';

import styles from './AdminScheduleEvents.module.css';


type AdminScheduleEventsProps = {
  scheduleEvents: AdminScheduleEvent[];
  onRefresh: () => void;
  onCreate: (payload: ScheduleEventPayload) => Promise<void>;
  onUpdate: (id: number, payload: ScheduleEventPayload) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export function AdminScheduleEvents({
  scheduleEvents,
  onRefresh,
  onCreate,
  onUpdate,
  onDelete,
}: AdminScheduleEventsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminScheduleEvent | null>(
    null,
  );
  const [formData, setFormData] = useState<ScheduleEventPayload>(
    initialScheduleEventFormData,
  );
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const sortedEvents = useMemo(
    () =>
      [...scheduleEvents].sort((a, b) => {
        const aNeedsScore = isScheduleEventNeedsScore(a);
        const bNeedsScore = isScheduleEventNeedsScore(b);

        if (aNeedsScore !== bNeedsScore) {
          return aNeedsScore ? -1 : 1;
        }

        const aTimestamp = new Date(`${a.date}T${a.time}`).getTime();
        const bTimestamp = new Date(`${b.date}T${b.time}`).getTime();

        if (aNeedsScore && bNeedsScore) {
          return bTimestamp - aTimestamp;
        }

        return aTimestamp - bTimestamp;
      }),
    [scheduleEvents],
  );

  const resetModalState = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData(initialScheduleEventFormData);
    setFormError('');
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData(initialScheduleEventFormData);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (event: AdminScheduleEvent) => {
    setEditingEvent(event);

    const nextFormData = getScheduleEventFormData(event);

    if (isScheduleEventNeedsScore(event)) {
      setFormData({
        ...nextFormData,
        status: 'finished',
        homeScore: 0,
        awayScore: 0,
      });
    } else {
      setFormData(nextFormData);
    }

    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) {
      return;
    }

    resetModalState();
  };

  const handleChange = (event: FormFieldChangeEvent) => {
    const { name, value } = event.target;

    setFormData((prevState) => {
      if (name === 'status') {
        const nextStatus = String(value) as ScheduleStatus;

        if (nextStatus === 'training') {
          return {
            ...prevState,
            status: nextStatus,
            homeTeam: '',
            awayTeam: '',
            homeScore: null,
            awayScore: null,
            tournament: prevState.tournament || 'Тренировка',
          };
        }

        return {
          ...prevState,
          status: nextStatus,
          homeTeam: prevState.homeTeam || 'VR CONCEPT FC',
          tournament: prevState.tournament || 'Чемпионат',
        };
      }

      if (name === 'homeScore' || name === 'awayScore') {
        return {
          ...prevState,
          [name]: value === null || value === undefined ? null : Number(value),
        };
      }

      return {
        ...prevState,
        [name]: String(value ?? ''),
      };
    });

    setFormError('');
  };

  const handleSubmit = async () => {
    const validationError = validateScheduleEventForm(formData);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSaving(true);

    try {
      const payload = normalizeScheduleEventForm(formData);

      if (editingEvent) {
        await onUpdate(editingEvent.id, payload);
      } else {
        await onCreate(payload);
      }

      resetModalState();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Не удалось сохранить событие',
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (event: AdminScheduleEvent) => {
    if (!window.confirm(`Удалить событие "${getEventTitle(event)}"?`)) {
      return;
    }

    try {
      await onDelete(event.id);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось удалить событие',
      );
    }
  };

  return (
    <div>
      <SectionHeader
        title="Расписание"
        description={`Всего событий: ${scheduleEvents.length}`}
        actions={
          <>
            <Button variant="secondary" onClick={onRefresh}>
              Обновить
            </Button>

            <Button onClick={openCreateModal}>Добавить событие</Button>
          </>
        }
      />

      {sortedEvents.length > 0 ? (
        <div className={styles.eventsList}>
          {sortedEvents.map((event) => (
            <ScheduleEventCard
              event={event}
              key={event.id}
              onEdit={openEditModal}
              onDelete={handleDelete}
              needsScore={isScheduleEventNeedsScore(event)}
              isPastTraining={isPastTrainingEvent(event)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <p className={styles.emptyText}>Событий пока нет</p>
        </Card>
      )}

      <ScheduleEventFormModal
        open={isModalOpen}
        isEditing={Boolean(editingEvent)}
        formData={formData}
        formError={formError}
        isSaving={isSaving}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </div>
  );
}
