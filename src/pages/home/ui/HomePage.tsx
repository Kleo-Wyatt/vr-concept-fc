import { useEffect, useState } from 'react';

import { getApiErrorMessage } from '@shared/api/http';

import { CtaSection } from './CtaSection/CtaSection';
import { HeroSection } from './HeroSection/HeroSection';
import { NewsPreviewSection } from './NewsPreviewSection/NewsPreviewSection';
import { StatsSection } from './StatsSection/StatsSection';
import { TeamPreviewSection } from './TeamPreviewSection/TeamPreviewSection';
import { UpcomingMatchSection } from './UpcomingMatchSection/UpcomingMatchSection';

import { getUpcomingMatch } from '../model/api';
import { homeNews, homePlayers, homeStats } from '../model/mockData';
import type { UpcomingMatch } from '../model/types';

import styles from './HomePage.module.css';

export function HomePage() {
  const [upcomingMatch, setUpcomingMatch] = useState<UpcomingMatch | null>(null);
  const [isUpcomingMatchLoading, setIsUpcomingMatchLoading] = useState(true);
  const [upcomingMatchError, setUpcomingMatchError] = useState('');

  useEffect(() => {
    getUpcomingMatch()
      .then(setUpcomingMatch)
      .catch((error) => {
        setUpcomingMatchError(getApiErrorMessage(error));
      })
      .finally(() => {
        setIsUpcomingMatchLoading(false);
      });
  }, []);

  return (
    <main className={styles.page}>
      <HeroSection />

      <UpcomingMatchSection
        match={upcomingMatch}
        isLoading={isUpcomingMatchLoading}
        error={upcomingMatchError}
      />

      <TeamPreviewSection players={homePlayers} />

      <NewsPreviewSection news={homeNews} />

      <StatsSection stats={homeStats} />

      <CtaSection />
    </main>
  );
}