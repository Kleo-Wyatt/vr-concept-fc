import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createSchema } from './schema.js';
import { runMigrations } from './migrate.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

const dataDir = path.resolve(currentDir, '../data');

fs.mkdirSync(dataDir, {
  recursive: true,
});

const databasePath = path.resolve(dataDir, 'database.sqlite');

export const db = new Database(databasePath);

db.pragma('journal_mode = WAL');

createSchema(db);
runMigrations(db);
