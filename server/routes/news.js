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