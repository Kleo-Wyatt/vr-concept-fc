import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { AppRoute } from '@shared/config/routes';
import { Button, Card, Modal } from '@shared/ui';

import {
  filterGalleryItems,
  formatGalleryDate,
  getGalleryCategories,
} from '../model/lib';
import { galleryItems } from '../model/mockData';
import type { GalleryCategoryFilter, GalleryItem } from '../model/types';

import styles from './GalleryPage.module.css';

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategoryFilter>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => getGalleryCategories(galleryItems), []);

  const filteredItems = useMemo(
    () => filterGalleryItems(galleryItems, selectedCategory),
    [selectedCategory],
  );

  const galleryStats = useMemo(
    () => [
      {
        value: String(galleryItems.length),
        label: 'Всего фото',
      },
      {
        value: String(categories.length - 1),
        label: 'Категорий',
      },
      {
        value: String(
          galleryItems.filter((item) => item.category === 'Матчи').length,
        ),
        label: 'Фото с матчей',
      },
      {
        value: String(
          galleryItems.filter((item) => item.category === 'События').length,
        ),
        label: 'События',
      },
    ],
    [categories.length],
  );

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Галерея</h1>
          <p className={styles.pageDescription}>
            Фотографии с матчей, тренировок и событий команды
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                className={clsx(
                  styles.filterButton,
                  selectedCategory === category && styles.filterButtonActive,
                )}
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Все' : category}
              </button>
            ))}
          </div>

          <div className={styles.galleryGrid}>
            {filteredItems.map((item) => (
              <Card
                className={styles.galleryCard}
                hoverable
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedItem(item);
                  }
                }}
              >
                <div className={styles.galleryImage}>{item.image}</div>

                <div className={styles.galleryOverlay}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <span className={styles.galleryDate}>
                    {formatGalleryDate(item.date)}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className={styles.emptyState}>
              <p>Нет фотографий в этой категории</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>О наших фотографиях</h2>

          <div className={styles.infoGrid}>
            <Card className={styles.infoCard}>
              <h3>Профессиональное качество</h3>
              <p>
                Все фотографии в галерее делаются в хорошем качестве. Каждый
                снимок отражает атмосферу матчей, тренировок и командных
                событий.
              </p>
            </Card>

            <Card className={styles.infoCard}>
              <h3>Разные категории</h3>
              <p>
                Мы добавляем фото с матчей, тренировок, клубных мероприятий и
                важных моментов из жизни команды.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Статистика галереи</h2>

          <div className={styles.statsGrid}>
            {galleryStats.map((stat) => (
              <Card className={styles.statCard} key={stat.label}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.cta}>
            <h2>Поделитесь вашими фото</h2>
            <p>
              Если у вас есть интересные фотографии с наших матчей или
              тренировок, пришлите их нам через форму контактов, и мы добавим их
              в галерею.
            </p>

            <Button as={Link} to={AppRoute.contacts} size="large">
              Отправить фото
            </Button>
          </div>
        </div>
      </section>

      {selectedItem && (
        <Modal
          open={Boolean(selectedItem)}
          title={null}
          width={820}
          footer={null}
          contentPadding="none"
          onCancel={closeModal}
        >
          <div className={styles.photoModalImage}>{selectedItem.image}</div>
        </Modal>
      )}
    </main>
  );
}
