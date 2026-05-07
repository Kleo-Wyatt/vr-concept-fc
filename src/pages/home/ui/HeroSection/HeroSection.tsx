import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { Button } from '@shared/ui';

import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>⚽ Добро пожаловать</span>

          <h1 className={styles.title}>VR CONCEPT FC</h1>

          <p className={styles.subtitle}>
            Любительская футбольная команда компании VR Concept. Объединяем
            технологии и спорт в едином духе командной работы.
          </p>

          <div className={styles.actions}>
            <Button as={Link} to={AppRoute.team} size="large">
              Посмотреть состав
            </Button>

            {/* <Button
              as={Link}
              to={AppRoute.matches}
              variant="secondary"
              size="large"
            >
              Расписание матчей
            </Button> */}
          </div>
        </div>

        <div className={styles.image} aria-hidden="true">
          <div className={styles.visual}>⚽🏆</div>
        </div>
      </div>
    </section>
  );
}