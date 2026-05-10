import { migrations } from './migrations/index.js';

export function runMigrations(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);

  const getAppliedMigration = db.prepare(`
    SELECT name
    FROM schema_migrations
    WHERE name = ?
  `);

  const markMigrationAsApplied = db.prepare(`
    INSERT INTO schema_migrations (name, applied_at)
    VALUES (?, ?)
  `);

  for (const migration of migrations) {
    const appliedMigration = getAppliedMigration.get(migration.name);

    if (appliedMigration) {
      continue;
    }

    const applyMigration = db.transaction(() => {
      migration.up(db);

      markMigrationAsApplied.run(migration.name, new Date().toISOString());
    });

    applyMigration();

    console.log(`Migration applied: ${migration.name}`);
  }
}
