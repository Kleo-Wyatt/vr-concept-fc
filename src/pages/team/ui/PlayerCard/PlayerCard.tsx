import { Card } from '@shared/ui';

import type { TeamPlayer } from '../../model/playersApi';

import styles from './PlayerCard.module.css';

type PlayerCardProps = {
  player: TeamPlayer;
};

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className={styles.playerCard}>
      <div className={styles.playerImage}>
        <div className={styles.playerAvatar}>{player.image}</div>
        <div className={styles.playerNumber}>{player.number}</div>
      </div>

      <div className={styles.playerInfo}>
        <h2 className={styles.playerName}>{player.name}</h2>
        <p className={styles.playerPosition}>{player.position}</p>
        <p className={styles.playerBio}>
          {player.bio || 'Описание игрока пока не добавлено'}
        </p>

        <div className={styles.playerStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Рост</span>
            <span className={styles.statValue}>{player.height || '—'} см</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statLabel}>Вес</span>
            <span className={styles.statValue}>{player.weight || '—'} кг</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
