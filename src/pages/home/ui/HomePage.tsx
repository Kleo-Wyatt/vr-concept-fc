import { CtaSection } from './CtaSection/CtaSection';
import { HeroSection } from './HeroSection/HeroSection';
import { NewsPreviewSection } from './NewsPreviewSection/NewsPreviewSection';
import { StatsSection } from './StatsSection/StatsSection';
import { TeamPreviewSection } from './TeamPreviewSection/TeamPreviewSection';
import { UpcomingMatchSection } from './UpcomingMatchSection/UpcomingMatchSection';

import {
  homeNews,
  homePlayers,
  homeStats,
  upcomingMatch,
} from '../model/mockData';

import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <main className={styles.page}>
      <HeroSection />

      <UpcomingMatchSection match={upcomingMatch} />

      <TeamPreviewSection players={homePlayers} />

      <NewsPreviewSection news={homeNews} />

      <StatsSection stats={homeStats} />

      <CtaSection />
    </main>
  );
}