import { PLAYER_PLACEHOLDER_IMAGE } from '../../model/playerForm';

import styles from './PlayerPhotoUpload.module.css';

type PlayerPhotoUploadProps = {
  previewSrc: string;
  showPreview: boolean;
  alt: string;
  selectedPhotoName: string;
  disabled: boolean;
  onFileSelect: (file: File) => void;
};

export function PlayerPhotoUpload({
  previewSrc,
  showPreview,
  alt,
  selectedPhotoName,
  disabled,
  onFileSelect,
}: PlayerPhotoUploadProps) {
  return (
    <div className={styles.photoUploadBlock}>
      <label className={styles.photoUploadLabel}>Фото игрока</label>

      {showPreview && (
        <div className={styles.photoPreview}>
          <img
            src={previewSrc}
            alt={alt}
            onError={(event) => {
              event.currentTarget.src = PLAYER_PLACEHOLDER_IMAGE;
            }}
          />
        </div>
      )}

      <div className={styles.fileUploadRow}>
        <label className={styles.fileUploadButton}>
          Выбрать фото
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            disabled={disabled}
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                onFileSelect(file);
              }

              event.target.value = '';
            }}
          />
        </label>

        <span className={styles.fileUploadName}>
          {selectedPhotoName || 'Файл не выбран'}
        </span>
      </div>
    </div>
  );
}
