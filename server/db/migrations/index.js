import { migration001CreateAndSeedPlayers } from './001_create_and_seed_players.js';
import { migration002CreateAndSeedScheduleEvents } from './002_create_and_seed_schedule_events.js';
import { migration003CreateAndSeedNews } from './003_create_and_seed_news.js';

export const migrations = [
  migration001CreateAndSeedPlayers,
  migration002CreateAndSeedScheduleEvents,
  migration003CreateAndSeedNews,
];
