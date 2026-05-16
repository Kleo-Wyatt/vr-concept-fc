import { Button, Drawer } from '@shared/ui';

import { formatNewsDate, getNewsImage } from '../../model/lib';
import type { NewsItem } from '@entities/news';

import styles from './NewsDetailsDrawer.module.css';

type NewsDetailsDrawerProps = {
  newsItem: NewsItem | null;
  open: boolean;
  onClose: () => void;
  onAfterClose: () => void;
};

export function NewsDetailsDrawer({
  newsItem,
  open,
  onClose,
  onAfterClose,
}: NewsDetailsDrawerProps) {
  if (!newsItem) {
    return null;
  }

  const newsImage = getNewsImage(newsItem);

  const contentParagraphs = newsItem.content
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <Drawer
      open={open}
      size="100vh"
      title="Новость"
      onClose={onClose}
      afterOpenChange={(isOpen) => {
        if (!isOpen) {
          onAfterClose();
        }
      }}
    >
      <article className={styles.article}>
        <div className={styles.imageWrapper}>
          <img
            src={newsImage.src}
            alt={newsImage.alt}
            className={styles.image}
          />
        </div>

        <span className={styles.category}>{newsItem.category}</span>

        <h2 className={styles.title}>{newsItem.title}</h2>

        <div className={styles.meta}>
          <span>📅 {formatNewsDate(newsItem.date)}</span>
          <span>✍️ {newsItem.author}</span>
        </div>

        <div className={styles.content}>
          {contentParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.actions}>
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </article>
    </Drawer>
  );
}
