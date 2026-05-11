import { Router } from 'express';

import { db } from '../db/database.js';

export const newsRouter = Router();

function mapNews(row) {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    date: row.date,
    category: row.category,
    author: row.author,
  };
}

function normalizeNewsPayload(body) {
  return {
    title: String(body.title ?? '').trim(),
    excerpt: String(body.excerpt ?? '').trim(),
    content: String(body.content ?? '').trim(),
    date: String(body.date ?? '').trim(),
    category: String(body.category ?? '').trim(),
    author: String(body.author ?? '').trim(),
  };
}

function validateNewsPayload(payload) {
  if (!payload.title) {
    return 'Введите заголовок новости';
  }

  if (!payload.content) {
    return 'Введите текст новости';
  }

  if (!payload.date) {
    return 'Введите дату новости';
  }

  if (!payload.category) {
    return 'Выберите категорию новости';
  }

  if (!payload.author) {
    return 'Введите автора новости';
  }

  return '';
}

newsRouter.get('/', (_req, res) => {
  const rows = db
    .prepare(
      `
      SELECT *
      FROM news
      ORDER BY date DESC
      `,
    )
    .all();

  res.json(rows.map(mapNews));
});

newsRouter.get('/featured', (_req, res) => {
  const row = db
    .prepare(
      `
      SELECT *
      FROM news
      ORDER BY date DESC
      LIMIT 1
      `,
    )
    .get();

  if (!row) {
    res.status(404).json({
      message: 'Новости не найдены',
    });
    return;
  }

  res.json(mapNews(row));
});

newsRouter.post('/', (req, res) => {
  const payload = normalizeNewsPayload(req.body);
  const validationError = validateNewsPayload(payload);

  if (validationError) {
    res.status(400).json({
      message: validationError,
    });
    return;
  }

  const result = db
    .prepare(
      `
      INSERT INTO news (
        title,
        excerpt,
        content,
        date,
        category,
        author
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
    )
    .run(
      payload.title,
      payload.excerpt,
      payload.content,
      payload.date,
      payload.category,
      payload.author,
    );

  const createdNews = db
    .prepare(
      `
      SELECT *
      FROM news
      WHERE id = ?
      `,
    )
    .get(result.lastInsertRowid);

  res.status(201).json(mapNews(createdNews));
});

newsRouter.patch('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id новости',
    });
    return;
  }

  const payload = normalizeNewsPayload(req.body);
  const validationError = validateNewsPayload(payload);

  if (validationError) {
    res.status(400).json({
      message: validationError,
    });
    return;
  }

  const result = db
    .prepare(
      `
      UPDATE news
      SET
        title = ?,
        excerpt = ?,
        content = ?,
        date = ?,
        category = ?,
        author = ?
      WHERE id = ?
      `,
    )
    .run(
      payload.title,
      payload.excerpt,
      payload.content,
      payload.date,
      payload.category,
      payload.author,
      id,
    );

  if (result.changes === 0) {
    res.status(404).json({
      message: 'Новость не найдена',
    });
    return;
  }

  const updatedNews = db
    .prepare(
      `
      SELECT *
      FROM news
      WHERE id = ?
      `,
    )
    .get(id);

  res.json(mapNews(updatedNews));
});

newsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Некорректный id новости',
    });
    return;
  }

  const result = db
    .prepare(
      `
      DELETE FROM news
      WHERE id = ?
      `,
    )
    .run(id);

  if (result.changes === 0) {
    res.status(404).json({
      message: 'Новость не найдена',
    });
    return;
  }

  res.status(204).send();
});