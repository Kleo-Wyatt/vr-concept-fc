import { Router } from 'express';
import { z } from 'zod';

import { db } from '../db/database.js';
import {
  parseIdParam,
  sendBadRequest,
  sendNotFound,
} from '../lib/httpResponses.js';

import { requireAuth } from '../middleware/requireAuth.js';

export const scheduleEventsRouter = Router();

const allowedStatuses = ['upcoming', 'finished', 'training'];

const scheduleEventSchema = z.object({
  date: z.string().min(1, 'Введите дату события'),
  time: z.string().min(1, 'Введите время события'),
  status: z.enum(allowedStatuses, {
    error: 'Выберите корректный статус события',
  }),
  homeTeam: z.string(),
  awayTeam: z.string(),
  homeScore: z.number().int().min(0).nullable(),
  awayScore: z.number().int().min(0).nullable(),
  location: z.string().min(1, 'Введите место проведения'),
  tournament: z.string().min(1, 'Введите турнир или тип события'),
});

const scheduleEventPayloadSchema = scheduleEventSchema
  .refine(
    (data) => {
      if (data.status === 'training') return true;
      return data.homeTeam.length > 0 && data.awayTeam.length > 0;
    },
    { message: 'Введите домашнюю команду' },
  )
  .refine(
    (data) => {
      if (data.status === 'training') return true;
      return data.awayTeam.length > 0;
    },
    { message: 'Введите гостевую команду' },
  )
  .refine(
    (data) => {
      if (data.status !== 'finished') return true;
      return (
        data.homeScore !== null &&
        data.awayScore !== null &&
        Number.isInteger(data.homeScore) &&
        Number.isInteger(data.awayScore)
      );
    },
    { message: 'Для завершенного матча укажите корректный счет' },
  );

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

function normalizeScheduleEventPayload(body) {
  const status = String(body.status ?? '').trim();

  const payload = {
    date: String(body.date ?? '').trim(),
    time: String(body.time ?? '').trim(),
    status,
    homeTeam: String(body.homeTeam ?? '').trim(),
    awayTeam: String(body.awayTeam ?? '').trim(),
    homeScore:
      body.homeScore === null ||
      body.homeScore === '' ||
      body.homeScore === undefined
        ? null
        : Number(body.homeScore),
    awayScore:
      body.awayScore === null ||
      body.awayScore === '' ||
      body.awayScore === undefined
        ? null
        : Number(body.awayScore),
    location: String(body.location ?? '').trim(),
    tournament: String(body.tournament ?? '').trim(),
  };

  if (payload.status === 'training') {
    return {
      ...payload,
      homeTeam: '',
      awayTeam: '',
      homeScore: null,
      awayScore: null,
    };
  }

  if (payload.status === 'upcoming') {
    return {
      ...payload,
      homeScore: null,
      awayScore: null,
    };
  }

  return payload;
}

function validateScheduleEventPayload(payload) {
  const result = scheduleEventPayloadSchema.safeParse(payload);

  if (!result.success) {
    return result.error.errors[0].message;
  }

  return '';
}

function getScheduleEventById(id) {
  return db
    .prepare(
      `
      SELECT *
      FROM schedule_events
      WHERE id = ?
      `,
    )
    .get(id);
}

scheduleEventsRouter.get('/upcoming-match', (_req, res) => {
  const row = db
    .prepare(
      `
      SELECT *
      FROM schedule_events
      WHERE status = 'upcoming'
        AND home_team <> ''
        AND away_team <> ''
        AND datetime(date || ' ' || time) >= datetime('now', 'localtime')
      ORDER BY date ASC, time ASC
      LIMIT 1
      `,
    )
    .get();

  if (!row) {
    sendNotFound(res, 'Ближайший матч не найден');
    return;
  }

  res.json(mapScheduleEvent(row));
});

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

scheduleEventsRouter.post('/', requireAuth, (req, res) => {
  const payload = normalizeScheduleEventPayload(req.body);
  const validationError = validateScheduleEventPayload(payload);

  if (validationError) {
    sendBadRequest(res, validationError);
    return;
  }

  const result = db
    .prepare(
      `
      INSERT INTO schedule_events (
        date,
        time,
        status,
        home_team,
        away_team,
        home_score,
        away_score,
        location,
        tournament
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    )
    .run(
      payload.date,
      payload.time,
      payload.status,
      payload.homeTeam,
      payload.awayTeam,
      payload.homeScore,
      payload.awayScore,
      payload.location,
      payload.tournament,
    );

  const createdEvent = getScheduleEventById(result.lastInsertRowid);

  res.status(201).json(mapScheduleEvent(createdEvent));
});

scheduleEventsRouter.patch('/:id', requireAuth, (req, res) => {
  const id = parseIdParam(req);

  if (id === null) {
    sendBadRequest(res, 'Некорректный id события');
    return;
  }

  const payload = normalizeScheduleEventPayload(req.body);
  const validationError = validateScheduleEventPayload(payload);

  if (validationError) {
    sendBadRequest(res, validationError);
    return;
  }

  const result = db
    .prepare(
      `
      UPDATE schedule_events
      SET
        date = ?,
        time = ?,
        status = ?,
        home_team = ?,
        away_team = ?,
        home_score = ?,
        away_score = ?,
        location = ?,
        tournament = ?
      WHERE id = ?
      `,
    )
    .run(
      payload.date,
      payload.time,
      payload.status,
      payload.homeTeam,
      payload.awayTeam,
      payload.homeScore,
      payload.awayScore,
      payload.location,
      payload.tournament,
      id,
    );

  if (result.changes === 0) {
    sendNotFound(res, 'Событие не найдено');
    return;
  }

  const updatedEvent = getScheduleEventById(id);

  res.json(mapScheduleEvent(updatedEvent));
});

scheduleEventsRouter.delete('/:id', requireAuth, (req, res) => {
  const id = parseIdParam(req);

  if (id === null) {
    sendBadRequest(res, 'Некорректный id события');
    return;
  }

  const result = db
    .prepare(
      `
      DELETE FROM schedule_events
      WHERE id = ?
      `,
    )
    .run(id);

  if (result.changes === 0) {
    sendNotFound(res, 'Событие не найдено');
    return;
  }

  res.status(204).send();
});
