import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createSchema } from './schema.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

const databasePath = path.resolve(currentDir, '../data/database.sqlite');

export const db = new Database(databasePath);

db.pragma('journal_mode = WAL');

createSchema(db);
