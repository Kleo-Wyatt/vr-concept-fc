import { useMemo, useState } from 'react';

import { filterTeamPlayers, getTeamInfo, getTeamPositions } from '../model/lib';
import { useTeamPlayers } from '../hooks/useTeamPlayers';

import { JoinTeamSection } from './JoinTeamSection/JoinTeamSection';
import { TeamInfoSection } from './TeamInfoSection/TeamInfoSection';
import { TeamPageHeader } from './TeamPageHeader/TeamPageHeader';
import { TeamPlayersSection } from './TeamPlayersSection/TeamPlayersSection';

import styles from './TeamPage.module.css';

export function TeamPage() {
  const [selectedPosition, setSelectedPosition] = useState('all');

  const { players, isLoading, error, refetch } = useTeamPlayers();

  const positions = useMemo(() => getTeamPositions(players), [players]);

  const filteredPlayers = useMemo(
    () => filterTeamPlayers(players, selectedPosition),
    [players, selectedPosition],
  );

  const teamInfo = useMemo(() => getTeamInfo(players), [players]);

  return (
    <main className={styles.page}>
      <TeamPageHeader />

      <TeamPlayersSection
        positions={positions}
        selectedPosition={selectedPosition}
        players={filteredPlayers}
        isLoading={isLoading}
        error={error}
        onSelectPosition={setSelectedPosition}
        onRefetch={() => void refetch()}
      />

      <TeamInfoSection teamInfo={teamInfo} />

      <JoinTeamSection />
    </main>
  );
}
