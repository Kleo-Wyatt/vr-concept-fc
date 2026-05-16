import { useMemo, useState } from 'react';

import { getApiErrorMessage } from '@shared/api/http';
import { Button, Card, SectionHeader } from '@shared/ui';
import type { FormFieldChangeEvent } from '@shared/ui';

import type { NewsItem as AdminNewsItem, NewsPayload } from '@entities/news';

import { NewsFormModal } from './NewsFormModal';
import {
  getNewsFormData,
  initialNewsFormData,
  validateNewsForm,
} from './newsForm';

import styles from './AdminNews.module.css';
import { formatShortDateRu } from '@shared/lib/date';


type AdminNewsProps = {
  news: AdminNewsItem[];
  onRefresh: () => void;
  onCreate: (payload: NewsPayload) => Promise<void>;
  onUpdate: (id: number, payload: NewsPayload) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export function AdminNews({
  news,
  onRefresh,
  onCreate,
  onUpdate,
  onDelete,
}: AdminNewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<AdminNewsItem | null>(null);
  const [formData, setFormData] = useState<NewsPayload>(initialNewsFormData);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const sortedNews = useMemo(
    () =>
      [...news].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [news],
  );

  const resetModalState = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setFormData(initialNewsFormData);
    setFormError('');
  };

  const openCreateModal = () => {
    setEditingNews(null);
    setFormData(initialNewsFormData);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdminNewsItem) => {
    setEditingNews(item);
    setFormData(getNewsFormData(item));
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;
    resetModalState();
  };

  const handleChange = (event: FormFieldChangeEvent) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: String(value ?? ''),
    }));

    setFormError('');
  };

  const handleSubmit = async () => {
    const validationError = validateNewsForm(formData);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSaving(true);

    try {
      if (editingNews) {
        await onUpdate(editingNews.id, formData);
      } else {
        await onCreate(formData);
      }

      resetModalState();
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: AdminNewsItem) => {
    if (!window.confirm(`Удалить новость "${item.title}"?`)) {
      return;
    }

    try {
      await onDelete(item.id);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось удалить новость',
      );
    }
  };

  return (
    <div>
      <SectionHeader
        title="Новости"
        description={`Всего новостей: ${news.length}`}
        actions={
          <>
            <Button variant="secondary" onClick={onRefresh}>
              Обновить
            </Button>

            <Button onClick={openCreateModal}>Добавить новость</Button>
          </>
        }
      />

      {sortedNews.length > 0 ? (
        <div className={styles.newsList}>
          {sortedNews.map((item) => (
            <Card key={item.id} className={styles.newsCard}>
              <div className={styles.newsCardBody}>
                <div className={styles.newsInfo}>
                  <div className={styles.newsTitleRow}>
                    <span className={styles.newsCategory}>{item.category}</span>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                  </div>

                  {item.excerpt && (
                    <p className={styles.newsExcerpt}>{item.excerpt}</p>
                  )}

                  <div className={styles.newsMeta}>
                    <span>{formatShortDateRu(item.date)}</span>
                    <span>{item.author}</span>
                  </div>
                </div>

                <div className={styles.newsActions}>
                  <Button size="small" onClick={() => openEditModal(item)}>
                    Редактировать
                  </Button>

                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => handleDelete(item)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className={styles.emptyText}>Новостей пока нет</p>
        </Card>
      )}

      <NewsFormModal
        open={isModalOpen}
        isEditing={Boolean(editingNews)}
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
