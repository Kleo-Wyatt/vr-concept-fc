import { Button, Card } from '@shared/ui';

import { formatNewsDate, getNewsImage } from '../../model/lib';
import type { NewsItem } from '../../model/types';

import styles from './NewsCard.module.css';

type NewsCardProps = {
  newsItem: NewsItem;
  onReadMore: (newsItem: NewsItem) => void;
};

export function NewsCard({ newsItem, onReadMore }: NewsCardProps) {
  const newsImage = getNewsImage(newsItem);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <img src={newsImage.src} alt={newsImage.alt} className={styles.image} />

        <span className={styles.category}>{newsItem.category}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{newsItem.title}</h3>
        <p className={styles.excerpt}>{newsItem.excerpt}</p>

        <div className={styles.meta}>
          <span>📅 {formatNewsDate(newsItem.date)}</span>
          <span>✍️ {newsItem.author}</span>
        </div>
      </div>

      <Button size="small" onClick={() => onReadMore(newsItem)}>
        Читать далее
      </Button>
    </Card>
  );
}
