import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { Button, Card } from '@shared/ui';

import type { Player } from '../../model/types';

import styles from './TeamPreviewSection.module.css';

type TeamPreviewSectionProps = {
  players: Player[];
};

export function TeamPreviewSection({ players }: TeamPreviewSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наш состав</h2>

        <div className={styles.grid}>
          {players.map((player) => (
            <Card className={styles.card} key={player.id}>
              <div className={styles.image}>
                <div className={styles.avatar}>{player.image}</div>
                <div className={styles.number}>{player.number}</div>
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{player.name}</h3>
                <p className={styles.position}>{player.position}</p>
                <p className={styles.bio}>{player.bio}</p>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Рост</span>
                    <span className={styles.statValue}>{player.height} см</span>
                  </div>

                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Вес</span>
                    <span className={styles.statValue}>{player.weight} кг</span>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <Button size="small">Подробнее</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.footer}>
          <Button as={Link} to={AppRoute.team} size="large">
            Посмотреть полный состав
          </Button>
        </div>
      </div>
    </section>
  );
}
