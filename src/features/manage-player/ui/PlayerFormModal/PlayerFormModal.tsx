import { Button, FormField, Modal } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type { PlayerPayload } from '@entities/player';

import { positionOptions } from '../../model/playerForm';
import { PlayerPhotoUpload } from '../PlayerPhotoUpload/PlayerPhotoUpload';

import styles from './PlayerFormModal.module.css';

type PlayerFormModalProps = {
  open: boolean;
  isEditing: boolean;
  formData: PlayerPayload;
  formError: string;
  isSaving: boolean;
  photoPreviewSrc: string;
  shouldShowPhotoPreview: boolean;
  selectedPhotoName: string;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (event: FormFieldChangeEvent) => void;
  onPhotoSelect: (file: File) => void;
};

export function PlayerFormModal({
  open,
  isEditing,
  formData,
  formError,
  isSaving,
  photoPreviewSrc,
  shouldShowPhotoPreview,
  selectedPhotoName,
  onClose,
  onSubmit,
  onChange,
  onPhotoSelect,
}: PlayerFormModalProps) {
  return (
    <Modal
      open={open}
      title={isEditing ? 'Редактировать игрока' : 'Добавить игрока'}
      width={640}
      onCancel={onClose}
      footer={null}
    >
      <div className={styles.adminForm}>
        {formError && <div className={styles.errorBox}>{formError}</div>}

        <FormField
          label="Номер"
          name="number"
          type="number"
          value={formData.number}
          onChange={onChange}
          required
          min={0}
        />

        <FormField
          label="Имя"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          placeholder="Иван Петров"
        />

        <FormField
          label="Позиция"
          name="position"
          type="select"
          value={formData.position}
          onChange={onChange}
          required
          options={positionOptions}
        />

        <PlayerPhotoUpload
          previewSrc={photoPreviewSrc}
          showPreview={shouldShowPhotoPreview}
          alt={formData.name || 'Фото игрока'}
          selectedPhotoName={selectedPhotoName}
          disabled={isSaving}
          onFileSelect={onPhotoSelect}
        />

        <FormField
          label="Описание"
          name="bio"
          type="textarea"
          value={formData.bio}
          onChange={onChange}
          placeholder="Краткое описание игрока"
        />

        <FormField
          label="Дата вступления"
          name="joinedDate"
          value={formData.joinedDate}
          onChange={onChange}
          placeholder="2026-05-09"
        />

        <div className={styles.formGridTwo}>
          <FormField
            label="Рост"
            name="height"
            value={formData.height}
            onChange={onChange}
            placeholder="180"
          />

          <FormField
            label="Вес"
            name="weight"
            value={formData.weight}
            onChange={onChange}
            placeholder="75"
          />
        </div>

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
