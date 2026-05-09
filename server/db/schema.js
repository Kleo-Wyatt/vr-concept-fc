export function createSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      subject TEXT DEFAULT '',
      message TEXT NOT NULL,
      date TEXT NOT NULL,
      read INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS ticket_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      ticket_count INTEGER NOT NULL DEFAULT 1,
      comment TEXT DEFAULT '',
      match_title TEXT NOT NULL,
      match_date TEXT NOT NULL,
      match_time TEXT NOT NULL,
      location TEXT NOT NULL,
      created_at TEXT NOT NULL,
      read INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number INTEGER NOT NULL,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      image TEXT DEFAULT '⚽',
      bio TEXT DEFAULT '',
      joined_date TEXT DEFAULT '',
      height TEXT DEFAULT '',
      weight TEXT DEFAULT ''
    );
  `);

  seedPlayers(db);
}

function seedPlayers(db) {
  const result = db.prepare('SELECT COUNT(*) as count FROM players').get();

  if (result.count > 0) {
    return;
  }

  const players = [
    [
      1,
      'Иван Петров',
      'Вратарь',
      '👨‍🔬',
      'Опытный вратарь с 10-летним стажем',
      '2020-06-15',
      '188',
      '82',
    ],
    [
      2,
      'Сергей Сидоров',
      'Защитник',
      '🧑‍💼',
      'Капитан команды, лидер на поле',
      '2019-03-22',
      '182',
      '78',
    ],
    [
      3,
      'Дмитрий Волков',
      'Защитник',
      '👨‍🏫',
      'Надежный защитник, мастер отбора',
      '2021-01-10',
      '185',
      '80',
    ],
    [
      4,
      'Алексей Морозов',
      'Полузащитник',
      '🧑‍🎨',
      'Творческий полузащитник, автор ассистов',
      '2020-09-05',
      '176',
      '72',
    ],
    [
      10,
      'Михаил Орлов',
      'Нападающий',
      '⚡',
      'Лучший бомбардир команды',
      '2021-07-12',
      '180',
      '76',
    ],
    [
      7,
      'Валерий Соколов',
      'Нападающий',
      '🎯',
      'Быстрый и ловкий форвард',
      '2022-02-01',
      '178',
      '74',
    ],
  ];

  const insertPlayer = db.prepare(`
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
  `);

  const insertMany = db.transaction((items) => {
    for (const player of items) {
      insertPlayer.run(...player);
    }
  });

  insertMany(players);
}
