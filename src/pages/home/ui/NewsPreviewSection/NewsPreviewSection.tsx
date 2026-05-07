import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { Button, Card } from '@shared/ui';

import { formatNewsDate } from '../../model/lib';
import type { NewsItem } from '../../model/types';

import styles from './NewsPreviewSection.module.css';

type NewsPreviewSectionProps = {
  news: NewsItem[];
};

export function NewsPreviewSection({ news }: NewsPreviewSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Последние новости</h2>

        <div className={styles.grid}>
          {news.map((newsItem) => (
            <Card className={styles.card} key={newsItem.id}>
              <div className={styles.header}>
                <div className={styles.image}>{newsItem.image}</div>
                <span className={styles.category}>{newsItem.category}</span>
              </div>

              <div className={styles.content}>
                <h3 className={styles.newsTitle}>{newsItem.title}</h3>
                <p className={styles.excerpt}>{newsItem.excerpt}</p>

                <div className={styles.meta}>
                  <span>📅 {formatNewsDate(newsItem.date)}</span>
                  <span>✍️ {newsItem.author}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <Button as={Link} to={AppRoute.news} size="small">
                  Читать далее
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.footer}>
          <Button as={Link} to={AppRoute.news} size="large">
            Все новости
          </Button>
        </div>
      </div>
    </section>
  );
}
