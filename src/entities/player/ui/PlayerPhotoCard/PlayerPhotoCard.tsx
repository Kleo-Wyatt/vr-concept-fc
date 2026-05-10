import type { ReactNode } from 'react';

import { Card } from '@shared/ui';

import styles from './PlayerPhotoCard.module.css';

export type PlayerPhotoCardData = {
  number: number;
  name: string;
  position: string;
  image?: string;
  bio?: string;
  height?: string;
  weight?: string;
};

type PlayerPhotoCardProps = {
  player: PlayerPhotoCardData;
  actions?: ReactNode;
};

const PLAYER_PLACEHOLDER_IMAGE = '/images/players/player-placeholder.png';

export function PlayerPhotoCard({ player, actions }: PlayerPhotoCardProps) {
  return (
    <Card className={styles.playerCard} hoverable tabIndex={0}>
      <div className={styles.playerImage}>
        <img
          src={player.image || PLAYER_PLACEHOLDER_IMAGE}
          alt={player.name}
          className={styles.playerPhoto}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = PLAYER_PLACEHOLDER_IMAGE;
          }}
        />

        <div className={styles.playerNumber}>{player.number}</div>

        <div className={styles.playerOverlay}>
          <p className={styles.playerPosition}>{player.position}</p>

          <h3 className={styles.playerName}>{player.name}</h3>

          <p className={styles.playerBio}>
            {player.bio || 'Описание игрока пока не добавлено'}
          </p>

          <div className={styles.playerStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Рост</span>
              <span className={styles.statValue}>
                {player.height || '—'} см
              </span>
            </div>

            <div className={styles.stat}>
              <span className={styles.statLabel}>Вес</span>
              <span className={styles.statValue}>
                {player.weight || '—'} кг
              </span>
            </div>
          </div>

          {actions && <div className={styles.playerActions}>{actions}</div>}
        </div>
      </div>
    </Card>
  );
}
