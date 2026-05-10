import { Router } from 'express';

import { db } from '../db/database.js';

export const scheduleEventsRouter = Router();

function mapScheduleEvent(row) {
  const baseEvent = {
    id: row.id,
    date: row.date,
    time: row.time,
    location: row.location,
    tournament: row.tournament,
  };

  if (row.status === 'training') {
    return {
      ...baseEvent,
      status: 'training',
    };
  }

  if (row.status === 'finished') {
    return {
      ...baseEvent,
      status: 'finished',
      homeTeam: row.home_team,
      awayTeam: row.away_team,
      homeScore: row.home_score,
      awayScore: row.away_score,
    };
  }

  return {
    ...baseEvent,
    status: 'upcoming',
    homeTeam: row.home_team,
    awayTeam: row.away_team,
  };
}

scheduleEventsRouter.get('/', (_req, res) => {
  const rows = db
    .prepare(
      `
      SELECT *
      FROM schedule_events
      ORDER BY date ASC, time ASC
      `,
    )
    .all();

  res.json(rows.map(mapScheduleEvent));
});
