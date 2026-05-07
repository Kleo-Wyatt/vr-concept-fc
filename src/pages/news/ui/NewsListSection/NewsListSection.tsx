import clsx from 'clsx';

import type { NewsCategoryFilter, NewsItem } from '../../model/types';

import { NewsCard } from '../NewsCard/NewsCard';

import styles from './NewsListSection.module.css';

type NewsListSectionProps = {
  categories: NewsCategoryFilter[];
  selectedCategory: NewsCategoryFilter;
  news: NewsItem[];
  onSelectCategory: (category: NewsCategoryFilter) => void;
  onReadMore: (newsItem: NewsItem) => void;
};

export function NewsListSection({
  categories,
  selectedCategory,
  news,
  onSelectCategory,
  onReadMore,
}: NewsListSectionProps) {
  return (
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
              onClick={() => onSelectCategory(category)}
            >
              {category === 'all' ? 'Все новости' : category}
            </button>
          ))}
        </div>

        <div className={styles.newsGrid}>
          {news.map((newsItem) => (
            <NewsCard
              newsItem={newsItem}
              key={newsItem.id}
              onReadMore={onReadMore}
            />
          ))}
        </div>

        {news.length === 0 && (
          <div className={styles.emptyState}>
            <p>Нет актуальных новостей в этой категории</p>
          </div>
        )}
      </div>
    </section>
  );
}
