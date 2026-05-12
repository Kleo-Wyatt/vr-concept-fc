import { Router } from 'express';

import { db } from '../db/database.js';
import {
  parseIdParam,
  sendBadRequest,
  sendNotFound,
} from '../lib/httpResponses.js';

import { requireAuth } from '../middleware/requireAuth.js';

export const playersRouter = Router();

function mapPlayer(row) {
  return {
    id: row.id,
    number: row.number,
    name: row.name,
    position: row.position,
    image: row.image,
    bio: row.bio,
    joinedDate: row.joined_date,
    height: row.height,
    weight: row.weight,
  };
}

function normalizePlayerPayload(body) {
  return {
    number: Number(body.number),
    name: String(body.name ?? '').trim(),
    position: String(body.position ?? '').trim(),
    image: String(body.image ?? '⚽').trim() || '⚽',
    bio: String(body.bio ?? '').trim(),
    joinedDate: String(body.joinedDate ?? '').trim(),
    height: String(body.height ?? '').trim(),
    weight: String(body.weight ?? '').trim(),
  };
}

function validatePlayerPayload(payload) {
  if (!Number.isInteger(payload.number) || payload.number < 0) {
    return 'Номер игрока должен быть целым положительным числом';
  }

  if (!payload.name) {
    return 'Введите имя игрока';
  }

  if (!payload.position) {
    return 'Выберите позицию игрока';
  }

  return '';
}

playersRouter.get('/', (_req, res) => {
  const rows = db
    .prepare(
      `
      SELECT *
      FROM players
      ORDER BY number ASC, name ASC
      `,
    )
    .all();

  res.json(rows.map(mapPlayer));
});

playersRouter.post('/', requireAuth, (req, res) => {
  const payload = normalizePlayerPayload(req.body);
  const validationError = validatePlayerPayload(payload);

  if (validationError) {
    sendBadRequest(res, validationError);
    return;
  }

  const result = db
    .prepare(
      `
      INSERT INTO players (
        number,
        name,
        position,
        image,
        bio,
        joined_date,
        height,
        weight
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
    )
    .run(
      payload.number,
      payload.name,
      payload.position,
      payload.image,
      payload.bio,
      payload.joinedDate,
      payload.height,
      payload.weight,
    );

  const createdPlayer = db
    .prepare(
      `
      SELECT *
      FROM players
      WHERE id = ?
      `,
    )
    .get(result.lastInsertRowid);

  res.status(201).json(mapPlayer(createdPlayer));
});

playersRouter.patch('/:id', requireAuth, (req, res) => {
  const id = parseIdParam(req);

  if (id === null) {
    sendBadRequest(res, 'Некорректный id игрока');
    return;
  }

  const payload = normalizePlayerPayload(req.body);
  const validationError = validatePlayerPayload(payload);

  if (validationError) {
    sendBadRequest(res, validationError);
    return;
  }

  const result = db
    .prepare(
      `
      UPDATE players
      SET
        number = ?,
        name = ?,
        position = ?,
        image = ?,
        bio = ?,
        joined_date = ?,
        height = ?,
        weight = ?
      WHERE id = ?
      `,
    )
    .run(
      payload.number,
      payload.name,
      payload.position,
      payload.image,
      payload.bio,
      payload.joinedDate,
      payload.height,
      payload.weight,
      id,
    );

  if (result.changes === 0) {
    sendNotFound(res, 'Игрок не найден');
    return;
  }

  const updatedPlayer = db
    .prepare(
      `
      SELECT *
      FROM players
      WHERE id = ?
      `,
    )
    .get(id);

  res.json(mapPlayer(updatedPlayer));
});

playersRouter.delete('/:id', requireAuth, (req, res) => {
  const id = parseIdParam(req);

  if (id === null) {
    sendBadRequest(res, 'Некорректный id игрока');
    return;
  }

  const result = db
    .prepare(
      `
      DELETE FROM players
      WHERE id = ?
      `,
    )
    .run(id);

  if (result.changes === 0) {
    sendNotFound(res, 'Игрок не найден');
    return;
  }

  res.status(204).send();
});
