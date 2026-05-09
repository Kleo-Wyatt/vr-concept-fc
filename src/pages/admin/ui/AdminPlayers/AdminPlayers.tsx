import { useMemo, useState } from 'react';

import { Button, Card, FormField, Modal } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type { Player, PlayerPayload } from '../../model/playersApi';

import styles from '../AdminPage.module.css';

type AdminPlayersProps = {
  players: Player[];
  onRefresh: () => void;
  onCreate: (payload: PlayerPayload) => Promise<void>;
  onUpdate: (id: number, payload: PlayerPayload) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const initialFormData: PlayerPayload = {
  number: 0,
  name: '',
  position: 'Полузащитник',
  image: '⚽',
  bio: '',
  joinedDate: '',
  height: '',
  weight: '',
};

const positionOptions = ['Вратарь', 'Защитник', 'Полузащитник', 'Нападающий'];

function validatePlayerForm(formData: PlayerPayload) {
  if (
    !Number.isInteger(Number(formData.number)) ||
    Number(formData.number) < 0
  ) {
    return 'Введите корректный номер игрока';
  }

  if (!formData.name.trim()) {
    return 'Введите имя игрока';
  }

  if (!formData.position.trim()) {
    return 'Выберите позицию игрока';
  }

  return '';
}

export function AdminPlayers({
  players,
  onRefresh,
  onCreate,
  onUpdate,
  onDelete,
}: AdminPlayersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState<PlayerPayload>(initialFormData);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const sortedPlayers = useMemo(
    () =>
      [...players].sort((a, b) => {
        if (a.number !== b.number) {
          return a.number - b.number;
        }

        return a.name.localeCompare(b.name, 'ru');
      }),
    [players],
  );

  const openCreateModal = () => {
    setEditingPlayer(null);
    setFormData(initialFormData);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      number: player.number,
      name: player.name,
      position: player.position,
      image: player.image,
      bio: player.bio,
      joinedDate: player.joinedDate,
      height: player.height,
      weight: player.weight,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) {
      return;
    }

    setIsModalOpen(false);
    setEditingPlayer(null);
    setFormData(initialFormData);
    setFormError('');
  };

  const handleChange = (event: FormFieldChangeEvent) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'number' ? Number(value) : String(value ?? ''),
    }));

    setFormError('');
  };

  const handleSubmit = async () => {
    const validationError = validatePlayerForm(formData);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSaving(true);

    try {
      if (editingPlayer) {
        await onUpdate(editingPlayer.id, formData);
      } else {
        await onCreate(formData);
      }

      closeModal();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Не удалось сохранить игрока',
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (player: Player) => {
    if (!window.confirm(`Удалить игрока ${player.name}?`)) {
      return;
    }

    try {
      await onDelete(player.id);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось удалить игрока',
      );
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h2>Игроки</h2>
          <p>Всего игроков: {players.length}</p>
        </div>

        <div className={styles.headerActions}>
          <Button variant="secondary" onClick={onRefresh}>
            Обновить
          </Button>

          <Button onClick={openCreateModal}>Добавить игрока</Button>
        </div>
      </div>

      {sortedPlayers.length > 0 ? (
        <div className={styles.playersGrid}>
          {sortedPlayers.map((player) => (
            <Card className={styles.playerAdminCard} key={player.id}>
              <div className={styles.playerAdminTop}>
                <div className={styles.playerAdminAvatar}>{player.image}</div>
                <div className={styles.playerAdminNumber}>#{player.number}</div>
              </div>

              <div className={styles.playerAdminBody}>
                <h3>{player.name}</h3>
                <p className={styles.playerAdminPosition}>{player.position}</p>
                <p>{player.bio || 'Описание не указано'}</p>

                <div className={styles.playerAdminStats}>
                  <span>Рост: {player.height || '—'} см</span>
                  <span>Вес: {player.weight || '—'} кг</span>
                </div>
              </div>

              <div className={styles.playerAdminActions}>
                <Button size="small" onClick={() => openEditModal(player)}>
                  Редактировать
                </Button>

                <Button
                  size="small"
                  variant="danger"
                  onClick={() => handleDelete(player)}
                >
                  Удалить
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className={styles.emptyText}>Игроков пока нет</p>
        </Card>
      )}

      <Modal
        open={isModalOpen}
        title={editingPlayer ? 'Редактировать игрока' : 'Добавить игрока'}
        width={640}
        onCancel={closeModal}
        footer={null}
      >
        <div className={styles.adminForm}>
          {formError && <div className={styles.errorBox}>{formError}</div>}

          <FormField
            label="Номер"
            name="number"
            type="number"
            value={formData.number}
            onChange={handleChange}
            required
            min={0}
          />

          <FormField
            label="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Иван Петров"
          />

          <FormField
            label="Позиция"
            name="position"
            type="select"
            value={formData.position}
            onChange={handleChange}
            required
            options={positionOptions}
          />

          <FormField
            label="Иконка"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="⚽"
          />

          <FormField
            label="Описание"
            name="bio"
            type="textarea"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Краткое описание игрока"
          />

          <FormField
            label="Дата вступления"
            name="joinedDate"
            value={formData.joinedDate}
            onChange={handleChange}
            placeholder="2026-05-09"
          />

          <div className={styles.formGridTwo}>
            <FormField
              label="Рост"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="180"
            />

            <FormField
              label="Вес"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="75"
            />
          </div>

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
