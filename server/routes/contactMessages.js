import { Router } from 'express';

import { db } from '../db/database.js';
import {
  parseIdParam,
  sendBadRequest,
  sendNotFound,
} from '../lib/httpResponses.js';
import { publicFormRateLimit } from '../middleware/rateLimit.js';

import { requireAuth } from '../middleware/requireAuth.js';

export const contactMessagesRouter = Router();

function mapContactMessage(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    date: row.date,
    read: Boolean(row.read),
  };
}

contactMessagesRouter.get('/', requireAuth, (_req, res) => {
  const rows = db
    .prepare(
      `
      SELECT *
      FROM contact_messages
      ORDER BY datetime(date) DESC
      `,
    )
    .all();

  res.json(rows.map(mapContactMessage));
});

contactMessagesRouter.post('/', publicFormRateLimit, (req, res) => {
  const { name, email, phone = '', subject = '', message } = req.body;

  if (!name || !email || !message) {
    sendBadRequest(res, 'Не заполнены обязательные поля');
    return;
  }

  const date = new Date().toISOString();

  const result = db
    .prepare(
      `
      INSERT INTO contact_messages (
        name,
        email,
        phone,
        subject,
        message,
        date,
        read
      )
      VALUES (?, ?, ?, ?, ?, ?, 0)
      `,
    )
    .run(name, email, phone, subject, message, date);

  const createdMessage = db
    .prepare(
      `
      SELECT *
      FROM contact_messages
      WHERE id = ?
      `,
    )
    .get(result.lastInsertRowid);

  res.status(201).json(mapContactMessage(createdMessage));
});

contactMessagesRouter.patch('/:id/read', requireAuth, (req, res) => {
  const id = parseIdParam(req);

  if (id === null) {
    sendBadRequest(res, 'Некорректный id сообщения');
    return;
  }

  db.prepare(
    `
    UPDATE contact_messages
    SET read = 1
    WHERE id = ?
    `,
  ).run(id);

  const updatedMessage = db
    .prepare(
      `
      SELECT *
      FROM contact_messages
      WHERE id = ?
      `,
    )
    .get(id);

  if (!updatedMessage) {
    sendNotFound(res, 'Сообщение не найдено');
    return;
  }

  res.json(mapContactMessage(updatedMessage));
});

contactMessagesRouter.delete('/:id', requireAuth, (req, res) => {
  const id = parseIdParam(req);

  if (id === null) {
    sendBadRequest(res, 'Некорректный id сообщения');
    return;
  }

  const result = db
    .prepare(
      `
      DELETE FROM contact_messages
      WHERE id = ?
      `,
    )
    .run(id);

  if (result.changes === 0) {
    sendNotFound(res, 'Сообщение не найдено');
    return;
  }

  res.status(204).send();
});
