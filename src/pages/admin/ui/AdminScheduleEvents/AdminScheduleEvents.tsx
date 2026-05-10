import { useMemo, useState } from 'react';

import { Button, Card, FormField, Modal } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type { ScheduleStatus } from '@pages/schedule/model/types';
import {
  type AdminScheduleEvent,
  type ScheduleEventPayload,
} from '../../model/scheduleEventsApi';

import styles from './AdminScheduleEvents.module.css';

type AdminScheduleEventsProps = {
  scheduleEvents: AdminScheduleEvent[];
  onRefresh: () => void;
  onCreate: (payload: ScheduleEventPayload) => Promise<void>;
  onUpdate: (id: number, payload: ScheduleEventPayload) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const initialFormData: ScheduleEventPayload = {
  date: '',
  time: '19:00',
  status: 'training',
  homeTeam: '',
  awayTeam: '',
  homeScore: null,
  awayScore: null,
  location: 'Тренировочное поле',
  tournament: 'Тренировка',
};

const statusOptions = [
  {
    value: 'training',
    label: 'Тренировка',
  },
  {
    value: 'upcoming',
    label: 'Предстоящий матч',
  },
  {
    value: 'finished',
    label: 'Завершенный матч',
  },
];

const statusLabels: Record<ScheduleStatus, string> = {
  training: 'Тренировка',
  upcoming: 'Предстоящий матч',
  finished: 'Завершенный матч',
};

function getEventTitle(event: AdminScheduleEvent) {
  if (event.status === 'training') {
    return 'Тренировка';
  }

  return `${event.homeTeam} vs ${event.awayTeam}`;
}

function getEventFormData(event: AdminScheduleEvent): ScheduleEventPayload {
  if (event.status === 'training') {
    return {
      ...initialFormData,
      id: undefined,
      date: event.date,
      time: event.time,
      status: event.status,
      location: event.location,
      tournament: event.tournament,
    } as ScheduleEventPayload;
  }

  if (event.status === 'upcoming') {
    return {
      date: event.date,
      time: event.time,
      status: event.status,
      homeTeam: event.homeTeam,
      awayTeam: event.awayTeam,
      homeScore: null,
      awayScore: null,
      location: event.location,
      tournament: event.tournament,
    };
  }

  return {
    date: event.date,
    time: event.time,
    status: event.status,
    homeTeam: event.homeTeam,
    awayTeam: event.awayTeam,
    homeScore: event.homeScore,
    awayScore: event.awayScore,
    location: event.location,
    tournament: event.tournament,
  };
}

function validateScheduleEventForm(formData: ScheduleEventPayload) {
  if (!formData.date.trim()) {
    return 'Введите дату события';
  }

  if (!formData.time.trim()) {
    return 'Введите время события';
  }

  if (!formData.location.trim()) {
    return 'Введите место проведения';
  }

  if (!formData.tournament.trim()) {
    return 'Введите турнир или тип события';
  }

  if (formData.status !== 'training') {
    if (!formData.homeTeam.trim()) {
      return 'Введите домашнюю команду';
    }

    if (!formData.awayTeam.trim()) {
      return 'Введите гостевую команду';
    }
  }

  if (formData.status === 'finished') {
    if (
      formData.homeScore === null ||
      formData.awayScore === null ||
      !Number.isInteger(formData.homeScore) ||
      !Number.isInteger(formData.awayScore) ||
      formData.homeScore < 0 ||
      formData.awayScore < 0
    ) {
      return 'Для завершенного матча укажите счет';
    }
  }

  return '';
}

function normalizeScheduleEventForm(
  formData: ScheduleEventPayload,
): ScheduleEventPayload {
  if (formData.status === 'training') {
    return {
      ...formData,
      homeTeam: '',
      awayTeam: '',
      homeScore: null,
      awayScore: null,
      location: formData.location.trim(),
      tournament: formData.tournament.trim(),
    };
  }

  if (formData.status === 'upcoming') {
    return {
      ...formData,
      homeTeam: formData.homeTeam.trim(),
      awayTeam: formData.awayTeam.trim(),
      homeScore: null,
      awayScore: null,
      location: formData.location.trim(),
      tournament: formData.tournament.trim(),
    };
  }

  return {
    ...formData,
    homeTeam: formData.homeTeam.trim(),
    awayTeam: formData.awayTeam.trim(),
    location: formData.location.trim(),
    tournament: formData.tournament.trim(),
  };
}

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
  const [formData, setFormData] =
    useState<ScheduleEventPayload>(initialFormData);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const sortedEvents = useMemo(
    () =>
      [...scheduleEvents].sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime(),
      ),
    [scheduleEvents],
  );

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData(initialFormData);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (event: AdminScheduleEvent) => {
    setEditingEvent(event);
    setFormData(getEventFormData(event));
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) {
      return;
    }

    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData(initialFormData);
    setFormError('');
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

      closeModal();
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
      <div className={styles.sectionHeader}>
        <div>
          <h2>Расписание</h2>
          <p>Всего событий: {scheduleEvents.length}</p>
        </div>

        <div className={styles.headerActions}>
          <Button variant="secondary" onClick={onRefresh}>
            Обновить
          </Button>

          <Button onClick={openCreateModal}>Добавить событие</Button>
        </div>
      </div>

      {sortedEvents.length > 0 ? (
        <div className={styles.eventsList}>
          {sortedEvents.map((event) => (
            <Card className={styles.eventCard} key={event.id}>
              <div className={styles.eventDate}>
                <span>{new Date(event.date).toLocaleDateString('ru-RU')}</span>
                <span className={styles.eventTime}>{event.time}</span>
              </div>

              <div className={styles.eventMain}>
                <h3>{getEventTitle(event)}</h3>
                <p>{event.location}</p>
                <p>{event.tournament}</p>

                {event.status === 'finished' && (
                  <p>
                    Счёт: {event.homeScore} : {event.awayScore}
                  </p>
                )}

                <span className={styles.status}>
                  {statusLabels[event.status]}
                </span>
              </div>

              <div className={styles.actions}>
                <Button size="small" onClick={() => openEditModal(event)}>
                  Редактировать
                </Button>

                <Button
                  size="small"
                  variant="danger"
                  onClick={() => handleDelete(event)}
                >
                  Удалить
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className={styles.emptyText}>Событий пока нет</p>
        </Card>
      )}

      <Modal
        open={isModalOpen}
        title={editingEvent ? 'Редактировать событие' : 'Добавить событие'}
        width={680}
        footer={null}
        onCancel={closeModal}
      >
        <div className={styles.form}>
          {formError && <div className={styles.errorBox}>{formError}</div>}

          <div className={styles.formGridTwo}>
            <FormField
              label="Дата"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              placeholder="2026-06-19"
            />

            <FormField
              label="Время"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              placeholder="18:30"
            />
          </div>

          <FormField
            label="Статус"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleChange}
            required
            options={statusOptions}
          />

          {formData.status !== 'training' && (
            <div className={styles.formGridTwo}>
              <FormField
                label="Домашняя команда"
                name="homeTeam"
                value={formData.homeTeam}
                onChange={handleChange}
                required
                placeholder="VR CONCEPT FC"
              />

              <FormField
                label="Гостевая команда"
                name="awayTeam"
                value={formData.awayTeam}
                onChange={handleChange}
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
                onChange={handleChange}
                min={0}
                required
              />

              <FormField
                label="Голы в гостях"
                name="awayScore"
                type="number"
                value={formData.awayScore}
                onChange={handleChange}
                min={0}
                required
              />
            </div>
          )}

          <FormField
            label="Место"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Стадион «Луч»"
          />

          <FormField
            label="Турнир / тип события"
            name="tournament"
            value={formData.tournament}
            onChange={handleChange}
            required
            placeholder="Чемпионат"
          />

          <div className={styles.modalActions}>
            <Button variant="ghost" onClick={closeModal} disabled={isSaving}>
              Отмена
            </Button>

            <Button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? 'Сохраняем...' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
