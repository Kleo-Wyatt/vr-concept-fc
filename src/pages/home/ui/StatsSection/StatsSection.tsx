import { Card } from '@shared/ui';

import type { HomeStat } from '../../model/types';

import styles from './StatsSection.module.css';

type StatsSectionProps = {
  stats: HomeStat[];
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Статистика команды</h2>

        <div className={styles.grid}>
          {stats.map((item) => (
            <Card className={styles.card} key={item.label}>
              <div className={styles.value}>{item.value}</div>
              <div className={styles.label}>{item.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
