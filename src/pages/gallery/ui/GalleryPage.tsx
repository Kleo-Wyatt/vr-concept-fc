import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { AppRoute } from '@shared/config/routes';
import { Button, Card, Modal, ScrollableFrame } from '@shared/ui';

import {
  filterGalleryItems,
  formatGalleryDate,
  galleryItems,
  getGalleryCategories,
  type GalleryCategoryFilter,
  type GalleryItem,
} from '@entities/gallery';

import styles from './GalleryPage.module.css';

const VISIBLE_GALLERY_ITEMS_LIMIT = 6;

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategoryFilter>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => getGalleryCategories(galleryItems), []);

  const filteredItems = useMemo(
    () => filterGalleryItems(galleryItems, selectedCategory),
    [selectedCategory],
  );

  const hasScrollableGallery =
    filteredItems.length > VISIBLE_GALLERY_ITEMS_LIMIT;

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

          <ScrollableFrame
            isScrollable={hasScrollableGallery}
            maxHeight="880px"
            tabletMaxHeight="980px"
            mobileMaxHeight="760px"
          >
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
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.galleryImage}
                  />

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
          </ScrollableFrame>

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
          width="fit-content"
          footer={null}
          contentPadding="none"
          onCancel={closeModal}
        >
          <img
            src={selectedItem.image}
            alt={selectedItem.title}
            className={styles.photoModalImage}
          />
        </Modal>
      )}
    </main>
  );
}
