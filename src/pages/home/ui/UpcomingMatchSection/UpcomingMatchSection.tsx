import { CalendarOutlined, EnvironmentFilled } from '@ant-design/icons';

import { DEFAULT_TEAM_ICON, getTeamIcon } from '@shared/config/teamIcons';
import { Button } from '@shared/ui';

import type { UpcomingMatch } from '../../model/types';

import styles from './UpcomingMatchSection.module.css';

type UpcomingMatchSectionProps = {
  match: UpcomingMatch | null;
  isLoading?: boolean;
  error?: string;
};

type TeamLogoProps = {
  teamName: string;
};

function formatCardDate(date: string, time: string) {
  const matchDate = new Date(`${date}T${time}`);

  const formattedDate = matchDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  return `${formattedDate}, ${time}`;
}

function TeamLogo({ teamName }: TeamLogoProps) {
  return (
    <img
      src={getTeamIcon(teamName)}
      alt={`Логотип ${teamName}`}
      className={styles.teamLogo}
      loading="lazy"
      onError={(event) => {
        if (!event.currentTarget.src.includes(DEFAULT_TEAM_ICON)) {
          event.currentTarget.src = DEFAULT_TEAM_ICON;
        }
      }}
    />
  );
}

export function UpcomingMatchSection({
  match,
  isLoading = false,
  error = '',
}: UpcomingMatchSectionProps) {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.title}>Ближайший матч</h2>
            <div className={styles.state}>
              Загружаем информацию о ближайшем матче...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.title}>Ближайший матч</h2>
            <div className={styles.state}>{error}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!match) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.title}>Ближайший матч</h2>
            <div className={styles.state}>
              Ближайший матч пока не запланирован
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>Ближайший матч</h2>

            <div className={styles.location}>
              <EnvironmentFilled className={styles.metaIcon} />
              <span>{match.location}</span>
            </div>
          </div>

          <div className={styles.topRow}>
            <div className={styles.meta}>
              <CalendarOutlined className={styles.metaIcon} />
              <span>{formatCardDate(match.date, match.time)}</span>
            </div>
          </div>

          <div className={styles.matchRow}>
            <div className={styles.team}>
              <div className={styles.logoBox}>
                <TeamLogo teamName={match.homeTeam} />
              </div>
              <div className={styles.teamName}>{match.homeTeam}</div>
            </div>

            <div className={styles.centerBlock}>
              <div className={styles.vs}>VS</div>
              <div className={styles.stage}>{match.tournament}</div>
            </div>

            <div className={styles.team}>
              <div className={styles.logoBox}>
                <TeamLogo teamName={match.awayTeam} />
              </div>
              <div className={styles.teamName}>{match.awayTeam}</div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.actions}>
            <Button className={styles.ticketButton} size="large">
              Получить билет
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
