import { useMemo, useState } from 'react';

import { Button, Card } from '@shared/ui';

import {
  formatNewsDate,
  getActualNews,
  getArchiveNews,
  getNewsCategories,
} from '../model/lib';
import { newsItems } from '../model/mockData';
import type { NewsCategoryFilter } from '../model/types';

import { NewsCard } from './NewsCard/NewsCard';

import styles from './NewsPage.module.css';import clsx from 'clsx';


const ARCHIVE_VISIBLE_LIMIT = 5;

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategoryFilter>('all');

  const actualNews = useMemo(() => getActualNews(newsItems), []);
  const archiveNews = useMemo(() => getArchiveNews(newsItems), []);
  const categories = useMemo(() => getNewsCategories(actualNews), [actualNews]);

  const featuredNews = actualNews[0];
  const hasScrollableArchive = archiveNews.length > ARCHIVE_VISIBLE_LIMIT;

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') {
      return actualNews;
    }

    return actualNews.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, actualNews]);

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Новости</h1>
          <p className={styles.pageDescription}>
            Актуальные новости о жизни нашей команды
          </p>
        </div>
      </section>

      {featuredNews && (
        <section className={clsx(styles.section, styles.featuredSection)}>
          <div className={styles.container}>
            <Card className={styles.featuredNews}>
              <div className={styles.featuredImage}>{featuredNews.image}</div>

              <div className={styles.featuredContent}>
                <span className={styles.featuredBadge}>
                  {featuredNews.category}
                </span>

                <h2>{featuredNews.title}</h2>

                <p className={styles.featuredExcerpt}>{featuredNews.content}</p>

                <div className={styles.featuredMeta}>
                  <span>📅 {formatNewsDate(featuredNews.date)}</span>
                  <span>✍️ {featuredNews.author}</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <section className={clsx(styles.section, styles.newsListSection)}>
        <div className={styles.container}>
          <div className={styles.categoryFilters}>
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
                {category === 'all' ? 'Все новости' : category}
              </button>
            ))}
          </div>

          <div className={styles.newsGrid}>
            {filteredNews.map((newsItem) => (
              <NewsCard newsItem={newsItem} key={newsItem.id} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className={styles.emptyState}>
              <p>Нет актуальных новостей в этой категории</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <Card className={styles.newsletter}>
            <h2>Подпишитесь на новости</h2>
            <p>
              Получайте свежие новости о матчах и событиях команды прямо на вашу
              почту
            </p>

            <form
              className={styles.newsletterForm}
              onSubmit={(event) => {
                event.preventDefault();
                alert('Спасибо за подписку!');
              }}
            >
              <input type="email" placeholder="Ваш email" required />
              <Button type="submit">Подписаться</Button>
            </form>
          </Card>
        </div>
      </section>

      {archiveNews.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Архив новостей</h2>

            <div
              className={clsx(
                styles.archiveFrame,
                hasScrollableArchive && styles.archiveFrameWithFade,
              )}
            >
              <div
                className={clsx(
                  styles.archiveWrapper,
                  hasScrollableArchive && styles.archiveWrapperScrollable,
                )}
              >
                <div className={styles.archive}>
                  {archiveNews.map((newsItem) => (
                    <article className={styles.archiveItem} key={newsItem.id}>
                      <div className={styles.archiveDate}>
                        {formatNewsDate(newsItem.date)}
                      </div>

                      <div className={styles.archiveContent}>
                        <a
                          href={`#news-${newsItem.id}`}
                          className={styles.archiveTitle}
                        >
                          {newsItem.title}
                        </a>

                        <p>{newsItem.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {hasScrollableArchive && (
              <p className={styles.archiveScrollHint}>
                Прокрутите, чтобы посмотреть больше новостей
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
