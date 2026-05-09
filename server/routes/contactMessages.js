import { Router } from 'express';

import { db } from '../db/database.js';

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

contactMessagesRouter.get('/', (_req, res) => {
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

contactMessagesRouter.post('/', (req, res) => {
  const { name, email, phone = '', subject = '', message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({
      message: 'Не заполнены обязательные поля',
    });
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

contactMessagesRouter.patch('/:id/read', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id сообщения',
    });
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
    res.status(404).json({
      message: 'Сообщение не найдено',
    });
    return;
  }

  res.json(mapContactMessage(updatedMessage));
});

contactMessagesRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id сообщения',
    });
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
    res.status(404).json({
      message: 'Сообщение не найдено',
    });
    return;
  }

  res.status(204).send();
});
