import { Button, FormField, Modal } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type { NewsPayload } from '../../model/newsApi';

import { categoryOptions } from './newsForm';

import styles from './AdminNews.module.css';

type NewsFormModalProps = {
  open: boolean;
  isEditing: boolean;
  formData: NewsPayload;
  formError: string;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (event: FormFieldChangeEvent) => void;
};

export function NewsFormModal({
  open,
  isEditing,
  formData,
  formError,
  isSaving,
  onClose,
  onSubmit,
  onChange,
}: NewsFormModalProps) {
  return (
    <Modal
      open={open}
      title={isEditing ? 'Редактировать новость' : 'Добавить новость'}
      width={720}
      footer={null}
      onCancel={onClose}
    >
      <div className={styles.form}>
        {formError && <div className={styles.errorBox}>{formError}</div>}

        <FormField
          label="Заголовок"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
          placeholder="Победа над Code Warriors"
        />

        <div className={styles.formGridTwo}>
          <FormField
            label="Категория"
            name="category"
            type="select"
            value={formData.category}
            onChange={onChange}
            required
            options={categoryOptions}
          />

          <FormField
            label="Дата"
            name="date"
            value={formData.date}
            onChange={onChange}
            required
            placeholder="2026-05-11"
          />
        </div>

        <FormField
          label="Автор"
          name="author"
          value={formData.author}
          onChange={onChange}
          required
          placeholder="Администратор"
        />

        <FormField
          label="Краткое описание"
          name="excerpt"
          type="textarea"
          rows={2}
          value={formData.excerpt}
          onChange={onChange}
          placeholder="Краткое описание для превью новости"
        />

        <FormField
          label="Текст новости"
          name="content"
          type="textarea"
          rows={8}
          value={formData.content}
          onChange={onChange}
          required
          placeholder="Полный текст статьи..."
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
