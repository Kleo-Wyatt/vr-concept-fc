import { Router } from 'express';

import { db } from '../db/database.js';

export const ticketRequestsRouter = Router();

function mapTicketRequest(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    ticketCount: row.ticket_count,
    comment: row.comment,
    matchTitle: row.match_title,
    matchDate: row.match_date,
    matchTime: row.match_time,
    location: row.location,
    createdAt: row.created_at,
    read: Boolean(row.read),
  };
}

ticketRequestsRouter.get('/', (_req, res) => {
  const rows = db
    .prepare(
      `
      SELECT *
      FROM ticket_requests
      ORDER BY datetime(created_at) DESC
      `,
    )
    .all();

  res.json(rows.map(mapTicketRequest));
});

ticketRequestsRouter.post('/', (req, res) => {
  const {
    name,
    email,
    phone = '',
    ticketCount = 1,
    comment = '',
    matchTitle,
    matchDate,
    matchTime,
    location,
  } = req.body;

  if (!name || !email || !matchTitle || !matchDate || !matchTime || !location) {
    res.status(400).json({
      message: 'Не заполнены обязательные поля',
    });
    return;
  }

  const normalizedTicketCount = Number(ticketCount);

  if (
    !Number.isInteger(normalizedTicketCount) ||
    normalizedTicketCount < 1 ||
    normalizedTicketCount > 10
  ) {
    res.status(400).json({
      message: 'Количество билетов должно быть от 1 до 10',
    });
    return;
  }

  const createdAt = new Date().toISOString();

  const result = db
    .prepare(
      `
      INSERT INTO ticket_requests (
        name,
        email,
        phone,
        ticket_count,
        comment,
        match_title,
        match_date,
        match_time,
        location,
        created_at,
        read
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      `,
    )
    .run(
      name,
      email,
      phone,
      normalizedTicketCount,
      comment,
      matchTitle,
      matchDate,
      matchTime,
      location,
      createdAt,
    );

  const createdRequest = db
    .prepare(
      `
      SELECT *
      FROM ticket_requests
      WHERE id = ?
      `,
    )
    .get(result.lastInsertRowid);

  res.status(201).json(mapTicketRequest(createdRequest));
});

ticketRequestsRouter.patch('/:id/read', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id заявки',
    });
    return;
  }

  db.prepare(
    `
    UPDATE ticket_requests
    SET read = 1
    WHERE id = ?
    `,
  ).run(id);

  const updatedRequest = db
    .prepare(
      `
      SELECT *
      FROM ticket_requests
      WHERE id = ?
      `,
    )
    .get(id);

  if (!updatedRequest) {
    res.status(404).json({
      message: 'Заявка не найдена',
    });
    return;
  }

  res.json(mapTicketRequest(updatedRequest));
});

ticketRequestsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id заявки',
    });
    return;
  }

  const result = db
    .prepare(
      `
      DELETE FROM ticket_requests
      WHERE id = ?
      `,
    )
    .run(id);

  if (result.changes === 0) {
    res.status(404).json({
      message: 'Заявка не найдена',
    });
    return;
  }

  res.status(204).send();
});
