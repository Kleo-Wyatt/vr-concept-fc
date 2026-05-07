import { Card } from '@shared/ui';

import styles from './ScheduleInfoSection.module.css';

export function ScheduleInfoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Важная информация</h2>

        <div className={styles.grid}>
          <Card>
            <h3 className={styles.infoTitle}>📋 Правила участия</h3>
            <ul className={styles.infoList}>
              <li>Приходить за 30 минут до начала матча</li>
              <li>Иметь при себе спортивное снаряжение</li>
              <li>Уведомлять тренера об отсутствии</li>
              <li>Соблюдать дисциплину и правила игры</li>
            </ul>
          </Card>

          <Card>
            <h3 className={styles.infoTitle}>⚠️ Подготовка</h3>
            <ul className={styles.infoList}>
              <li>Тренировки 2 раза в неделю</li>
              <li>Разминка перед каждым матчем</li>
              <li>Здоровье и безопасность — приоритет</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
