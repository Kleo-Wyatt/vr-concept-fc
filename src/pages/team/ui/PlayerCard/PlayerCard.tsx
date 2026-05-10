import { Card } from '@shared/ui';

import type { TeamPlayer } from '../../model/playersApi';

import styles from './PlayerCard.module.css';

type PlayerCardProps = {
  player: TeamPlayer;
};

const PLAYER_PLACEHOLDER_IMAGE = '/images/players/player-placeholder.png';

export function PlayerCard({ player }: PlayerCardProps) {
  const playerImage = player.image || PLAYER_PLACEHOLDER_IMAGE;

  return (
    <Card className={styles.playerCard} hoverable tabIndex={0}>
      <div className={styles.playerImage}>
        <img
          src={playerImage}
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

          <h2 className={styles.playerName}>{player.name}</h2>

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
        </div>
      </div>
    </Card>
  );
}
