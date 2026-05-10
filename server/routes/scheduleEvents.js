import { Router } from 'express';

import { db } from '../db/database.js';

export const scheduleEventsRouter = Router();

const allowedStatuses = new Set(['upcoming', 'finished', 'training']);

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
      body.homeScore === null || body.homeScore === '' || body.homeScore === undefined
        ? null
        : Number(body.homeScore),
    awayScore:
      body.awayScore === null || body.awayScore === '' || body.awayScore === undefined
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
  if (!payload.date) {
    return 'Введите дату события';
  }

  if (!payload.time) {
    return 'Введите время события';
  }

  if (!allowedStatuses.has(payload.status)) {
    return 'Выберите корректный статус события';
  }

  if (!payload.location) {
    return 'Введите место проведения';
  }

  if (!payload.tournament) {
    return 'Введите турнир или тип события';
  }

  if (payload.status !== 'training') {
    if (!payload.homeTeam) {
      return 'Введите домашнюю команду';
    }

    if (!payload.awayTeam) {
      return 'Введите гостевую команду';
    }
  }

  if (payload.status === 'finished') {
    if (
      !Number.isInteger(payload.homeScore) ||
      !Number.isInteger(payload.awayScore) ||
      payload.homeScore < 0 ||
      payload.awayScore < 0
    ) {
      return 'Для завершенного матча укажите корректный счет';
    }
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

scheduleEventsRouter.post('/', (req, res) => {
  const payload = normalizeScheduleEventPayload(req.body);
  const validationError = validateScheduleEventPayload(payload);

  if (validationError) {
    res.status(400).json({
      message: validationError,
    });
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

scheduleEventsRouter.patch('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id события',
    });
    return;
  }

  const payload = normalizeScheduleEventPayload(req.body);
  const validationError = validateScheduleEventPayload(payload);

  if (validationError) {
    res.status(400).json({
      message: validationError,
    });
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
    res.status(404).json({
      message: 'Событие не найдено',
    });
    return;
  }

  const updatedEvent = getScheduleEventById(id);

  res.json(mapScheduleEvent(updatedEvent));
});

scheduleEventsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id события',
    });
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
    res.status(404).json({
      message: 'Событие не найдено',
    });
    return;
  }

  res.status(204).send();
});