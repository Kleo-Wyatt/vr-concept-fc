import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { Button, Card } from '@shared/ui';

import styles from './TeamPage.module.css';

type Player = {
  id: number;
  number: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  joinedDate: string;
  height: string;
  weight: string;
};

const players: Player[] = [
  {
    id: 1,
    number: 1,
    name: 'Иван Петров',
    position: 'Вратарь',
    image: '👨‍🔬',
    bio: 'Опытный вратарь с 10-летним стажем',
    joinedDate: '2020-06-15',
    height: '188',
    weight: '82',
  },
  {
    id: 2,
    number: 2,
    name: 'Сергей Сидоров',
    position: 'Защитник',
    image: '🧑‍💼',
    bio: 'Капитан команды, лидер на поле',
    joinedDate: '2019-03-22',
    height: '182',
    weight: '78',
  },
  {
    id: 3,
    number: 3,
    name: 'Дмитрий Волков',
    position: 'Защитник',
    image: '👨‍🏫',
    bio: 'Надежный защитник, мастер отбора',
    joinedDate: '2021-01-10',
    height: '185',
    weight: '80',
  },
  {
    id: 4,
    number: 4,
    name: 'Алексей Морозов',
    position: 'Полузащитник',
    image: '🧑‍🎨',
    bio: 'Творческий полузащитник, автор ассистов',
    joinedDate: '2020-09-05',
    height: '176',
    weight: '72',
  },
  {
    id: 5,
    number: 10,
    name: 'Михаил Орлов',
    position: 'Нападающий',
    image: '⚡',
    bio: 'Лучший бомбардир команды',
    joinedDate: '2021-07-12',
    height: '180',
    weight: '76',
  },
  {
    id: 6,
    number: 7,
    name: 'Валерий Соколов',
    position: 'Нападающий',
    image: '🎯',
    bio: 'Быстрый и ловкий форвард',
    joinedDate: '2022-02-01',
    height: '178',
    weight: '74',
  },
];

export function TeamPage() {
  const [selectedPosition, setSelectedPosition] = useState('all');

  const positions = useMemo(
    () => ['all', ...new Set(players.map((player) => player.position))],
    [],
  );

  const filteredPlayers = useMemo(() => {
    if (selectedPosition === 'all') {
      return players;
    }

    return players.filter((player) => player.position === selectedPosition);
  }, [selectedPosition]);

  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Состав команды</h1>
          <p className={styles.pageDescription}>
            Познакомьтесь с нашими талантливыми игроками
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filters}>
            {positions.map((position) => (
              <button
                className={[
                  styles.filterButton,
                  selectedPosition === position
                    ? styles.filterButtonActive
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={position}
                type="button"
                onClick={() => setSelectedPosition(position)}
              >
                {position === 'all' ? 'Все' : position}
              </button>
            ))}
          </div>

          <div className={styles.playersGrid}>
            {filteredPlayers.map((player) => (
              <Card className={styles.playerCard} key={player.id}>
                <div className={styles.playerImage}>
                  <div className={styles.playerAvatar}>{player.image}</div>
                  <div className={styles.playerNumber}>{player.number}</div>
                </div>

                <div className={styles.playerInfo}>
                  <h2 className={styles.playerName}>{player.name}</h2>
                  <p className={styles.playerPosition}>{player.position}</p>
                  <p className={styles.playerBio}>{player.bio}</p>

                  <div className={styles.playerStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Рост</span>
                      <span className={styles.statValue}>
                        {player.height} см
                      </span>
                    </div>

                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Вес</span>
                      <span className={styles.statValue}>
                        {player.weight} кг
                      </span>
                    </div>
                  </div>
                </div>

                <Button size="small">Подробнее</Button>
              </Card>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className={styles.emptyState}>
              <p>Нет игроков на выбранной позиции</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Информация о команде</h2>

          <div className={styles.infoGrid}>
            <Card className={styles.infoCard}>
              <div className={styles.infoNumber}>{players.length}</div>
              <div className={styles.infoLabel}>Всего игроков</div>
            </Card>

            <Card className={styles.infoCard}>
              <div className={styles.infoNumber}>{positions.length - 1}</div>
              <div className={styles.infoLabel}>Позиций</div>
            </Card>

            <Card className={styles.infoCard}>
              <div className={styles.infoNumber}>2020</div>
              <div className={styles.infoLabel}>Год основания</div>
            </Card>

            <Card className={styles.infoCard}>
              <div className={styles.infoNumber}>25+</div>
              <div className={styles.infoLabel}>Средний возраст</div>
            </Card>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Требования к новым игрокам</h2>

          <div className={styles.requirementsGrid}>
            <Card className={styles.requirementCard}>
              <h3>Обязательные требования</h3>
              <ul>
                <li>✓ Быть сотрудником VR Concept</li>
                <li>✓ Иметь опыт игры в футбол</li>
                <li>✓ Хорошее состояние здоровья</li>
                <li>✓ Быть готовым к регулярным тренировкам</li>
              </ul>
            </Card>

            <Card className={styles.requirementCard}>
              <h3>Желаемые качества</h3>
              <ul>
                <li>⭐ Командный дух и коммуникативность</li>
                <li>⭐ Ответственность и дисциплинированность</li>
                <li>⭐ Желание развиваться как спортсмен</li>
                <li>⭐ Позитивный настрой и мотивация</li>
              </ul>
            </Card>
          </div>

          <Card className={styles.contactBlock}>
            <h3>Хотите присоединиться?</h3>
            <p>
              Если вы соответствуете этим требованиям и заинтересованы в игре за
              VR CONCEPT FC, свяжитесь с нами через форму обратной связи.
            </p>

            <Button as={Link} to={AppRoute.contacts} size="large">
              Связаться с нами
            </Button>
          </Card>
        </div>
      </section>
    </main>
  );
}
