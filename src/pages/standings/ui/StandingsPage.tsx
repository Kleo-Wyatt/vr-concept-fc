import { Card } from '@shared/ui';

import { goals, standingsSourceData, tournamentInfo } from '../model/mockData';
import { calculateStandings, getTeamMetrics } from '../model/lib';

import { StandingsTable } from './StandingsTable/StandingsTable';

import styles from './StandingsPage.module.css';

const TEAM_NAME = 'VR CONCEPT FC';

export function StandingsPage() {
  const standingsData = calculateStandings(standingsSourceData);
  const teamMetrics = getTeamMetrics(standingsData, TEAM_NAME);

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Турнирная таблица</h1>
          <p className={styles.pageDescription}>
            Текущее положение команд в чемпионате
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <StandingsTable teams={standingsData} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>О турнире</h2>

          <div className={styles.infoGrid}>
            {tournamentInfo.map((info) => (
              <Card className={styles.infoCard} key={info.title}>
                <h3>{info.title}</h3>
                <ul>
                  {info.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>VR CONCEPT FC в цифрах</h2>

          <div className={styles.metricsGrid}>
            {teamMetrics.map((metric) => (
              <Card className={styles.metricCard} key={metric.label}>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricNote}>{metric.note}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Наши цели</h2>

          <div className={styles.goalsGrid}>
            {goals.map((goal) => (
              <Card className={styles.goalCard} key={goal.title}>
                <div className={styles.goalIcon}>{goal.icon}</div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
