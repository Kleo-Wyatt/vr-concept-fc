import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

import { getApiErrorMessage } from '@shared/api/http';
import { Button, Card, FormField, Modal } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';
import { PlayerPhotoCard } from '@entities/player/ui/PlayerPhotoCard';

import {
  uploadAdminPlayerPhoto,
  type Player,
  type PlayerPayload,
} from '../../model/playersApi';

import styles from './AdminPlayers.module.css';

type AdminPlayersProps = {
  players: Player[];
  onRefresh: () => void;
  onCreate: (payload: PlayerPayload) => Promise<void>;
  onUpdate: (id: number, payload: PlayerPayload) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const PLAYER_PLACEHOLDER_IMAGE = '/images/players/player-placeholder.png';

const initialFormData: PlayerPayload = {
  number: 0,
  name: '',
  position: 'Полузащитник',
  image: PLAYER_PLACEHOLDER_IMAGE,
  bio: '',
  joinedDate: '',
  height: '',
  weight: '',
};

const positionOptions = ['Вратарь', 'Защитник', 'Полузащитник', 'Нападающий'];

const allowedPhotoTypes = ['image/png', 'image/jpeg', 'image/webp'];

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

  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [selectedPhotoName, setSelectedPhotoName] = useState('');
  const [selectedPhotoPreviewUrl, setSelectedPhotoPreviewUrl] = useState('');

  useEffect(() => {
    return () => {
      if (selectedPhotoPreviewUrl) {
        URL.revokeObjectURL(selectedPhotoPreviewUrl);
      }
    };
  }, [selectedPhotoPreviewUrl]);

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

  const resetSelectedPhoto = () => {
    setSelectedPhotoFile(null);
    setSelectedPhotoName('');
    setSelectedPhotoPreviewUrl('');
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setEditingPlayer(null);
    setFormData(initialFormData);
    setFormError('');
    resetSelectedPhoto();
  };

  const openCreateModal = () => {
    setEditingPlayer(null);
    setFormData(initialFormData);
    setFormError('');
    resetSelectedPhoto();
    setIsModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      number: player.number,
      name: player.name,
      position: player.position,
      image: player.image || PLAYER_PLACEHOLDER_IMAGE,
      bio: player.bio,
      joinedDate: player.joinedDate,
      height: player.height,
      weight: player.weight,
    });
    setFormError('');
    resetSelectedPhoto();
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

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'number' ? Number(value) : String(value ?? ''),
    }));

    setFormError('');
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!allowedPhotoTypes.includes(file.type)) {
      setFormError('Можно выбрать только PNG, JPG или WEBP');
      event.target.value = '';
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setFormError('Размер фото не должен превышать 3 МБ');
      event.target.value = '';
      return;
    }

    setSelectedPhotoFile(file);
    setSelectedPhotoName(file.name);
    setSelectedPhotoPreviewUrl(URL.createObjectURL(file));
    setFormError('');

    event.target.value = '';
  };

  const handleSubmit = async () => {
    const validationError = validatePlayerForm(formData);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSaving(true);

    try {
      let payload: PlayerPayload = formData;

      if (selectedPhotoFile) {
        const uploadedPhoto = await uploadAdminPlayerPhoto(selectedPhotoFile);

        payload = {
          ...formData,
          image: uploadedPhoto.image,
        };
      }

      if (editingPlayer) {
        await onUpdate(editingPlayer.id, payload);
      } else {
        await onCreate(payload);
      }

      resetModalState();
    } catch (error) {
      setFormError(getApiErrorMessage(error));
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

  const photoPreviewSrc =
    selectedPhotoPreviewUrl || formData.image || PLAYER_PLACEHOLDER_IMAGE;

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
            <PlayerPhotoCard
              key={player.id}
              player={player}
              actions={
                <>
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
                </>
              }
            />
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

          <div className={styles.photoUploadBlock}>
            <label className={styles.photoUploadLabel}>Фото игрока</label>

            <div className={styles.photoPreview}>
              <img
                src={photoPreviewSrc}
                alt={formData.name || 'Фото игрока'}
                onError={(event) => {
                  event.currentTarget.src = PLAYER_PLACEHOLDER_IMAGE;
                }}
              />
            </div>

            <div className={styles.fileUploadRow}>
              <label className={styles.fileUploadButton}>
                Выбрать фото
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handlePhotoChange}
                  disabled={isSaving}
                />
              </label>

              <span className={styles.fileUploadName}>
                {selectedPhotoName || 'Файл не выбран'}
              </span>
            </div>
          </div>

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
