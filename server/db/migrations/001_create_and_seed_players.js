const players = [
  {
    number: 2,
    name: 'Сергей Сидоров',
    position: 'Защитник',
    image: '/images/players/sergey-sidorov.png',
    bio: 'Капитан команды, лидер на поле',
    joinedDate: '2019-03-22',
    height: '182',
    weight: '78',
  },
  {
    number: 7,
    name: 'Валерий Соколов',
    position: 'Нападающий',
    image: '/images/players/valeriy-sokolov.png',
    bio: 'Быстрый и ловкий форвард',
    joinedDate: '2022-02-01',
    height: '178',
    weight: '74',
  },
  {
    number: 9,
    name: 'Алексей Морозов',
    position: 'Полузащитник',
    image: '/images/players/alexey-morozov.png',
    bio: 'Творческий полузащитник, автор ассистов',
    joinedDate: '2020-09-05',
    height: '176',
    weight: '72',
  },
  {
    number: 10,
    name: 'Михаил Орлов',
    position: 'Нападающий',
    image: '/images/players/mikhail-orlov.png',
    bio: 'Лучший бомбардир команды',
    joinedDate: '2021-07-12',
    height: '180',
    weight: '76',
  },
  {
    number: 13,
    name: 'Дмитрий Волков',
    position: 'Защитник',
    image: '/images/players/dmitriy-volkov.png',
    bio: 'Надежный защитник, мастер отбора',
    joinedDate: '2021-01-10',
    height: '185',
    weight: '80',
  },
  {
    number: 18,
    name: 'Иван Петров',
    position: 'Вратарь',
    image: '/images/players/ivan-petrov.png',
    bio: 'Опытный вратарь с 10-летним стажем',
    joinedDate: '2020-06-15',
    height: '188',
    weight: '82',
  },
];

export const migration001CreateAndSeedPlayers = {
  name: '001_create_and_seed_players',

  up(db) {
    db.exec(`
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

      CREATE INDEX IF NOT EXISTS idx_players_number_name
      ON players(number, name);
    `);

    const existingPlayers = db
      .prepare('SELECT COUNT(*) as count FROM players')
      .get();

    if (existingPlayers.count > 0) {
      return;
    }

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

    for (const player of players) {
      insertPlayer.run(
        player.number,
        player.name,
        player.position,
        player.image,
        player.bio,
        player.joinedDate,
        player.height,
        player.weight,
      );
    }
  },
};
