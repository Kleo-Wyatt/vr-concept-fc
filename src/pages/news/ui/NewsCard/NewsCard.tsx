import { Button, Card } from '@shared/ui';

import { formatNewsDate } from '../../model/lib';
import type { NewsItem } from '../../model/types';

import styles from './NewsCard.module.css';

type NewsCardProps = {
  newsItem: NewsItem;
};

export function NewsCard({ newsItem }: NewsCardProps) {
  return (
    <Card className={styles.card} id={`news-${newsItem.id}`}>
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

      <Button href={`#news-${newsItem.id}`} size="small">
        Читать далее
      </Button>
    </Card>
  );
}
