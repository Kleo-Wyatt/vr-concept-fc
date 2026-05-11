import { useEffect, useMemo, useState } from 'react';

import { getApiErrorMessage } from '@shared/api/http';
import { Button, Card } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';
import { PlayerPhotoCard } from '@entities/player/ui/PlayerPhotoCard';

import {
  uploadAdminPlayerPhoto,
  type Player,
  type PlayerPayload,
} from '../../model/playersApi';

import { PlayerFormModal } from './PlayerFormModal';
import {
  getPlayerFormData,
  initialPlayerFormData,
  PLAYER_PLACEHOLDER_IMAGE,
  validatePlayerForm,
  validatePlayerPhoto,
} from './playerForm';

import styles from './AdminPlayers.module.css';
import { scheduleEvents } from '@pages/schedule/model/mockData';
import { AdminSectionHeader } from '../AdminSectionHeader/AdminSectionHeader';

type AdminPlayersProps = {
  players: Player[];
  onRefresh: () => void;
  onCreate: (payload: PlayerPayload) => Promise<void>;
  onUpdate: (id: number, payload: PlayerPayload) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export function AdminPlayers({
  players,
  onRefresh,
  onCreate,
  onUpdate,
  onDelete,
}: AdminPlayersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState<PlayerPayload>(
    initialPlayerFormData,
  );
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
    setFormData(initialPlayerFormData);
    setFormError('');
    resetSelectedPhoto();
  };

  const openCreateModal = () => {
    setEditingPlayer(null);
    setFormData(initialPlayerFormData);
    setFormError('');
    resetSelectedPhoto();
    setIsModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setEditingPlayer(player);
    setFormData(getPlayerFormData(player));
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

  const handlePhotoSelect = (file: File) => {
    const validationError = validatePlayerPhoto(file);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (selectedPhotoPreviewUrl) {
      URL.revokeObjectURL(selectedPhotoPreviewUrl);
    }

    setSelectedPhotoFile(file);
    setSelectedPhotoName(file.name);
    setSelectedPhotoPreviewUrl(URL.createObjectURL(file));
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

  const hasSavedPhoto = Boolean(
    editingPlayer?.image && editingPlayer.image !== PLAYER_PLACEHOLDER_IMAGE,
  );

  const shouldShowPhotoPreview = Boolean(
    selectedPhotoPreviewUrl || hasSavedPhoto,
  );

  const photoPreviewSrc =
    selectedPhotoPreviewUrl || formData.image || PLAYER_PLACEHOLDER_IMAGE;

  return (
    <div>
      <AdminSectionHeader
        title="Игроки"
        description={`Всего игроков: ${players.length}`}
        actions={
          <>
            <Button variant="secondary" onClick={onRefresh}>
              Обновить
            </Button>

            <Button onClick={openCreateModal}>Добавить игрока</Button>
          </>
        }
      />

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

      <PlayerFormModal
        open={isModalOpen}
        isEditing={Boolean(editingPlayer)}
        formData={formData}
        formError={formError}
        isSaving={isSaving}
        photoPreviewSrc={photoPreviewSrc}
        shouldShowPhotoPreview={shouldShowPhotoPreview}
        selectedPhotoName={selectedPhotoName}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onPhotoSelect={handlePhotoSelect}
      />
    </div>
  );
}
