import { Button } from '@shared/ui';

import { formatMatchDate } from '../../model/lib';
import type { UpcomingMatch } from '../../model/types';

import styles from './UpcomingMatchSection.module.css';

type UpcomingMatchSectionProps = {
  match: UpcomingMatch | null;
  isLoading?: boolean;
  error?: string;
};

export function UpcomingMatchSection({
  match,
  isLoading = false,
  error = '',
}: UpcomingMatchSectionProps) {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Ближайший матч</h2>

          <div className={styles.state}>
            Загружаем информацию о ближайшем матче...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Ближайший матч</h2>

          <div className={styles.state}>{error}</div>
        </div>
      </section>
    );
  }

  if (!match) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Ближайший матч</h2>

          <div className={styles.state}>
            Ближайший матч пока не запланирован
          </div>
        </div>
      </section>
    );
  }

  const matchDate = new Date(`${match.date}T${match.time}`);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ближайший матч</h2>

        <div className={styles.card}>
          <div className={styles.date}>
            <span className={styles.day}>{matchDate.getDate()}</span>
            <span className={styles.month}>
              {matchDate.toLocaleDateString('ru-RU', { month: 'short' })}
            </span>
          </div>

          <div className={styles.teams}>
            <div className={styles.team}>
              <span className={styles.teamName}>{match.homeTeam}</span>
              <span className={styles.teamLogo}>⚽</span>
            </div>

            <div className={styles.center}>
              <span className={styles.time}>{match.time}</span>
              <span className={styles.vs}>VS</span>
            </div>

            <div className={styles.team}>
              <span className={styles.teamLogo}>⚽</span>
              <span className={styles.teamName}>{match.awayTeam}</span>
            </div>
          </div>

          <div className={styles.details}>
            <p>
              <span>Дата и время:</span>
              {formatMatchDate(match.date)} в {match.time}
            </p>

            <p>
              <span>Место:</span>
              {match.location}
            </p>

            <p>
              <span>Турнир:</span>
              {match.tournament}
            </p>
          </div>

          <Button variant="cta" size="large">
            Получить билет
          </Button>
        </div>
      </div>
    </section>
  );
}