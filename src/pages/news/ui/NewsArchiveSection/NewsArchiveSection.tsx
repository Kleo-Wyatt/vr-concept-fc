import clsx from 'clsx';

import { formatNewsDate } from '../../model/lib';
import type { NewsItem } from '../../model/types';

import styles from './NewsArchiveSection.module.css';

type NewsArchiveSectionProps = {
  news: NewsItem[];
  hasScrollableArchive: boolean;
  onReadMore: (newsItem: NewsItem) => void;
};

export function NewsArchiveSection({
  news,
  hasScrollableArchive,
  onReadMore,
}: NewsArchiveSectionProps) {
  if (news.length === 0) {
    return null;
  }

  return (
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
              {news.map((newsItem) => (
                <article className={styles.archiveItem} key={newsItem.id}>
                  <div className={styles.archiveDate}>
                    {formatNewsDate(newsItem.date)}
                  </div>

                  <div className={styles.archiveContent}>
                    <button
                      className={styles.archiveTitle}
                      type="button"
                      onClick={() => onReadMore(newsItem)}
                    >
                      {newsItem.title}
                    </button>

                    <p>{newsItem.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
