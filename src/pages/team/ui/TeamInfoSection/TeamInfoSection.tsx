import { Card } from '@shared/ui';

import type { TeamInfoItem } from '../../model/lib';

import styles from './TeamInfoSection.module.css';

type TeamInfoSectionProps = {
  teamInfo: TeamInfoItem[];
};

export function TeamInfoSection({ teamInfo }: TeamInfoSectionProps) {
  return (
    <section className={styles.sectionAlt}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Информация о команде</h2>

        <div className={styles.infoGrid}>
          {teamInfo.map((info) => (
            <Card className={styles.infoCard} key={info.label}>
              <div className={styles.infoNumber}>{info.value}</div>
              <div className={styles.infoLabel}>{info.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
