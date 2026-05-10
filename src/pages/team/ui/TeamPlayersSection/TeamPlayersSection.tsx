import clsx from 'clsx';

import { Button, Card } from '@shared/ui';

import type { TeamPlayer } from '../../model/playersApi';

import { PlayerPhotoCard } from '@entities/player/ui/PlayerPhotoCard';

import styles from './TeamPlayersSection.module.css';

type TeamPlayersSectionProps = {
  positions: string[];
  selectedPosition: string;
  players: TeamPlayer[];
  isLoading: boolean;
  error: Error | null;
  onSelectPosition: (position: string) => void;
  onRefetch: () => void;
};

export function TeamPlayersSection({
  positions,
  selectedPosition,
  players,
  isLoading,
  error,
  onSelectPosition,
  onRefetch,
}: TeamPlayersSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {isLoading && (
          <Card>
            <p className={styles.emptyStateText}>Загрузка состава...</p>
          </Card>
        )}

        {error && (
          <Card>
            <div className={styles.errorBox}>
              <p>{error.message || 'Не удалось загрузить состав команды'}</p>

              <Button onClick={onRefetch}>Повторить загрузку</Button>
            </div>
          </Card>
        )}

        {!isLoading && !error && (
          <>
            <div className={styles.filters}>
              {positions.map((position) => (
                <button
                  className={clsx(
                    styles.filterButton,
                    selectedPosition === position && styles.filterButtonActive,
                  )}
                  key={position}
                  type="button"
                  onClick={() => onSelectPosition(position)}
                >
                  {position === 'all' ? 'Все' : position}
                </button>
              ))}
            </div>

            <div className={styles.playersGrid}>
              {players.map((player) => (
                <PlayerPhotoCard key={player.id} player={player} />
              ))}
            </div>

            {players.length === 0 && (
              <div className={styles.emptyState}>
                <p>Нет игроков в этой категории</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
