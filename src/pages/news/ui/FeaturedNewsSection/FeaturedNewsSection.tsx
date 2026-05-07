import clsx from 'clsx';

import { Card } from '@shared/ui';

import { formatNewsDate } from '../../model/lib';
import type { NewsItem } from '../../model/types';

import styles from './FeaturedNewsSection.module.css';

type FeaturedNewsSectionProps = {
  newsItem: NewsItem;
  onReadMore: (newsItem: NewsItem) => void;
};

export function FeaturedNewsSection({
  newsItem,
  onReadMore,
}: FeaturedNewsSectionProps) {
  return (
    <section className={clsx(styles.section, styles.featuredSection)}>
      <div className={styles.container}>
        <Card className={styles.featuredNews}>
          <div className={styles.featuredImage}>{newsItem.image}</div>

          <div className={styles.featuredContent}>
            <span className={styles.featuredBadge}>{newsItem.category}</span>

            <h2>{newsItem.title}</h2>

            <p className={styles.featuredExcerpt}>{newsItem.content}</p>

            <div className={styles.featuredMeta}>
              <span>📅 {formatNewsDate(newsItem.date)}</span>
              <span>✍️ {newsItem.author}</span>
            </div>

            <button
              className={styles.featuredReadMore}
              type="button"
              onClick={() => onReadMore(newsItem)}
            >
              Читать новость
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
