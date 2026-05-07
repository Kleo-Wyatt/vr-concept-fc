import { Table } from '@shared/ui';
import type { TableProps } from '@shared/ui';

import { formatGoalDifference } from '../../model/lib';
import type { StandingsTeam } from '../../model/types';

import styles from './StandingsTable.module.css';

type StandingsTableProps = {
  teams: StandingsTeam[];
};

export function StandingsTable({ teams }: StandingsTableProps) {
  const columns: TableProps<StandingsTeam>['columns'] = [
    {
      title: '№',
      dataIndex: 'position',
      key: 'position',
      render: (position: number) => (
        <span className={styles.positionBadge}>{position}</span>
      ),
    },
    {
      title: 'Команда',
      dataIndex: 'teamName',
      key: 'teamName',
      render: (teamName: string) => (
        <span className={styles.teamName}>{teamName}</span>
      ),
    },
    {
      title: 'И',
      dataIndex: 'played',
      key: 'played',
    },
    {
      title: 'В',
      dataIndex: 'wins',
      key: 'wins',
      render: (wins: number) => <span className={styles.wins}>{wins}</span>,
    },
    {
      title: 'Н',
      dataIndex: 'draws',
      key: 'draws',
      render: (draws: number) => <span className={styles.draws}>{draws}</span>,
    },
    {
      title: 'П',
      dataIndex: 'losses',
      key: 'losses',
      render: (losses: number) => (
        <span className={styles.losses}>{losses}</span>
      ),
    },
    {
      title: 'ГЗ',
      dataIndex: 'goalsFor',
      key: 'goalsFor',
      responsive: ['sm'],
    },
    {
      title: 'ГП',
      dataIndex: 'goalsAgainst',
      key: 'goalsAgainst',
      responsive: ['sm'],
    },
    {
      title: 'Р',
      dataIndex: 'goalDifference',
      key: 'goalDifference',
      responsive: ['sm'],
      render: (goalDifference: number) => formatGoalDifference(goalDifference),
    },
    {
      title: 'О',
      dataIndex: 'points',
      key: 'points',
      render: (points: number) => (
        <strong className={styles.points}>{points}</strong>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Table<StandingsTeam>
        columns={columns}
        data={teams}
        pagination={false}
        rowClassName={(team) =>
          team.teamName === 'VR CONCEPT FC' ? styles.highlightRow : ''
        }
      />

      <div className={styles.legend}>
        <span>И — игры</span>
        <span>В — выигрыши</span>
        <span>Н — ничьи</span>
        <span>П — поражения</span>
        <span>ГЗ — голы забитые</span>
        <span>ГП — голы пропущенные</span>
        <span>Р — разница голов</span>
        <span>О — очки</span>
      </div>
    </div>
  );
}
