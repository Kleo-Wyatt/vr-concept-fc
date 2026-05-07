import { Button, Card } from '@shared/ui';

import { formatNewsDate } from '../../model/lib';
import type { NewsItem } from '../../model/types';

import styles from './NewsCard.module.css';

type NewsCardProps = {
  newsItem: NewsItem;
  onReadMore: (newsItem: NewsItem) => void;
};

export function NewsCard({ newsItem, onReadMore }: NewsCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.image}>{newsItem.image}</div>
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
