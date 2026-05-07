import { Card } from '@shared/ui';

import styles from './AboutPage.module.css';

type ValueItem = {
  icon: string;
  title: string;
  description: string;
};

type StructureItem = {
  role: string;
  name: string;
  description: string;
};

type SponsorItem = {
  logo: string;
  name: string;
};

const achievements = [
  '🏆 Чемпион турнира "IT Cup 2022"',
  '🥈 2-е место в "Tech Football League 2023"',
  '🥉 3-е место в "Innovation Cup 2023"',
  '⭐ Наибольшее количество голов в сезоне 2024',
  '👥 18 постоянных игроков в составе',
];

const values: ValueItem[] = [
  {
    icon: '⚽',
    title: 'Спортивность',
    description:
      'Мы воплощаем дух справедливой игры и честной конкуренции. Каждый матч — это возможность показать свои лучшие качества.',
  },
  {
    icon: '🤝',
    title: 'Командный дух',
    description:
      'Единство — наша сила. Мы верим, что вместе можем достичь больше, чем каждый из нас в отдельности.',
  },
  {
    icon: '🎯',
    title: 'Развитие',
    description:
      'Каждый день мы стремимся улучшать свои навыки и помогать товарищам по команде становиться сильнее.',
  },
];

const teamStructure: StructureItem[] = [
  {
    role: 'Главный тренер',
    name: 'Петр Иванович Козлов',
    description:
      '30 лет опыта в профессиональном футболе. Бывший игрок высшей лиги, сейчас передает свой опыт команде.',
  },
  {
    role: 'Помощник тренера',
    name: 'Виктор Сергеевич Смирнов',
    description:
      'Специалист по физической подготовке и тактике. Отвечает за индивидуальное развитие игроков.',
  },
  {
    role: 'Врач команды',
    name: 'Наталья Ивановна Лебедева',
    description:
      'Врач со специализацией в спортивной медицине. Следит за здоровьем и безопасностью игроков.',
  },
  {
    role: 'Капитан команды',
    name: 'Сергей Ивановский Сидоров',
    description:
      'Лидер команды с 10-летним стажем. Отвечает за дисциплину и командный дух на поле и вне его.',
  },
];

const sponsors: SponsorItem[] = [
  {
    logo: 'VR CONCEPT',
    name: 'Основной спонсор',
  },
  {
    logo: 'DataTech',
    name: 'Официальный партнер',
  },
  {
    logo: 'TechWear',
    name: 'Партнер по экипировке',
  },
  {
    logo: 'FitLabs',
    name: 'Партнер по тренировкам',
  },
];

export function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>О команде</h1>
          <p className={styles.pageDescription}>
            История и миссия VR CONCEPT FC
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.historyGrid}>
            <div className={styles.content}>
              <h2>Наша история</h2>

              <p>
                VR CONCEPT FC была основана в 2020 году как любительская
                футбольная команда сотрудников компании VR Concept. Что началось
                как маленькое увлечение коллег по работе, превратилось в
                полноценный спортивный коллектив.
              </p>

              <p>
                За время существования команда приняла участие в многочисленных
                турнирах и чемпионатах, заработала внушительную коллекцию кубков
                и медалей. Но самое главное — мы создали дружную, сплоченную
                команду, где каждый игрок важен.
              </p>

              <p>
                Сегодня VR CONCEPT FC — это не просто команда, это символ
                единства, дружбы и стремления к победе среди сотрудников
                компании.
              </p>
            </div>

            <Card className={styles.highlightCard}>
              <h3>Достижения</h3>

              <ul className={styles.achievements}>
                {achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Миссия и ценности</h2>

          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <Card className={styles.valueCard} key={value.title}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Структура команды</h2>

          <div className={styles.structureGrid}>
            {teamStructure.map((item) => (
              <Card className={styles.structureCard} key={item.role}>
                <h3>{item.role}</h3>
                <p className={styles.personName}>{item.name}</p>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Наши спонсоры</h2>

          <div className={styles.sponsorsGrid}>
            {sponsors.map((sponsor) => (
              <article className={styles.sponsorCard} key={sponsor.logo}>
                <div className={styles.sponsorLogo}>{sponsor.logo}</div>
                <p className={styles.sponsorName}>{sponsor.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
