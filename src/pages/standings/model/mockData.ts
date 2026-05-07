import type { GoalItem, InfoCard, StandingsTeamSource } from './types';

export const standingsSourceData: StandingsTeamSource[] = [
  {
    id: 1,
    teamName: 'VR CONCEPT FC',
    wins: 3,
    draws: 0,
    losses: 1,
    goalsFor: 9,
    goalsAgainst: 4,
  },
  {
    id: 2,
    teamName: 'Digital FC',
    wins: 2,
    draws: 1,
    losses: 1,
    goalsFor: 8,
    goalsAgainst: 5,
  },
  {
    id: 3,
    teamName: 'Innovation FC',
    wins: 1,
    draws: 1,
    losses: 1,
    goalsFor: 5,
    goalsAgainst: 4,
  },
  {
    id: 4,
    teamName: 'Code Warriors',
    wins: 1,
    draws: 1,
    losses: 1,
    goalsFor: 4,
    goalsAgainst: 5,
  },
  {
    id: 5,
    teamName: 'TECH United',
    wins: 0,
    draws: 1,
    losses: 1,
    goalsFor: 2,
    goalsAgainst: 4,
  },
  {
    id: 6,
    teamName: 'Pixel FC',
    wins: 0,
    draws: 0,
    losses: 2,
    goalsFor: 2,
    goalsAgainst: 8,
  },
];

export const tournamentInfo: InfoCard[] = [
  {
    title: 'Формат турнира',
    items: [
      '📋 Круговая система — каждый играет с каждым',
      '🏆 Стандартные правила футбола',
      '⏱️ Матчи по 90 минут — 2 тайма по 45 минут',
      '🥅 Все голы учитываются в общей статистике',
    ],
  },
  {
    title: 'Система очков',
    items: [
      '🥇 Победа — 3 очка',
      '🤝 Ничья — 1 очко',
      '❌ Поражение — 0 очков',
      '📊 При равенстве очков учитываются разница голов и забитые голы',
    ],
  },
];

export const goals: GoalItem[] = [
  {
    icon: '🏆',
    title: 'Стать чемпионами',
    description:
      'Наша основная цель — выиграть чемпионат и завоевать первое место.',
  },
  {
    icon: '⚽',
    title: 'Атакующий футбол',
    description:
      'Развивать агрессивный, зрелищный стиль игры с большим количеством моментов.',
  },
  {
    icon: '🛡️',
    title: 'Надежная защита',
    description:
      'Улучшать оборону и минимизировать количество пропущенных голов.',
  },
  {
    icon: '💪',
    title: 'Физическая форма',
    description:
      'Поддерживать хорошую физическую подготовку всех игроков команды.',
  },
];
