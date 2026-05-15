import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import {
  getNews,
  newsQueryKeys,
  type NewsCategoryFilter,
  type NewsItem,
} from '@entities/news';
import { getActualNews, getArchiveNews, getNewsCategories } from '../model/lib';

import { FeaturedNewsSection } from './FeaturedNewsSection/FeaturedNewsSection';
import { NewsArchiveSection } from './NewsArchiveSection/NewsArchiveSection';
import { NewsDetailsDrawer } from './NewsDetailsDrawer/NewsDetailsDrawer';
import { NewsListSection } from './NewsListSection/NewsListSection';
import { NewsletterSection } from './NewsletterSection/NewsletterSection';

import styles from './NewsPage.module.css';

const ARCHIVE_VISIBLE_LIMIT = 5;

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategoryFilter>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isNewsDrawerOpen, setIsNewsDrawerOpen] = useState(false);

  const newsQuery = useQuery({
    queryKey: newsQueryKeys.all,
    queryFn: getNews,
  });

  const news = useMemo(() => newsQuery.data ?? [], [newsQuery.data]);

  const actualNews = useMemo(() => getActualNews(news), [news]);
  const archiveNews = useMemo(() => getArchiveNews(news), [news]);
  const categories = useMemo(() => getNewsCategories(actualNews), [actualNews]);

  const featuredNews = actualNews[0];
  const hasScrollableArchive = archiveNews.length > ARCHIVE_VISIBLE_LIMIT;

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') {
      return actualNews;
    }

    return actualNews.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, actualNews]);

  const openNewsDrawer = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsNewsDrawerOpen(true);
  };

  const closeNewsDrawer = () => {
    setIsNewsDrawerOpen(false);
  };

  const clearSelectedNews = () => {
    setSelectedNews(null);
  };

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
        <FeaturedNewsSection
          newsItem={featuredNews}
          onReadMore={openNewsDrawer}
        />
      )}

      <NewsListSection
        categories={categories}
        selectedCategory={selectedCategory}
        news={filteredNews}
        onSelectCategory={setSelectedCategory}
        onReadMore={openNewsDrawer}
      />

      <NewsletterSection />

      <NewsArchiveSection
        news={archiveNews}
        hasScrollableArchive={hasScrollableArchive}
        onReadMore={openNewsDrawer}
      />

      <NewsDetailsDrawer
        newsItem={selectedNews}
        open={isNewsDrawerOpen}
        onClose={closeNewsDrawer}
        onAfterClose={clearSelectedNews}
      />
    </main>
  );
}
