import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { DEFAULT_TEAM_ICON, getTeamIcon } from '@shared/config/teamIcons';
import { Button } from '@shared/ui';

import styles from './HeroSection.module.css';

const SITE_TEAM_NAME = 'VR CONCEPT FC';

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Добро пожаловать</span>

          <h1 className={styles.title}>VR CONCEPT FC</h1>

          <p className={styles.subtitle}>
            Любительская футбольная команда компании VR Concept. Объединяем
            технологии и спорт в едином духе командной работы.
          </p>

          <div className={styles.actions}>
            <Button as={Link} to={AppRoute.team} size="large">
              Посмотреть состав
            </Button>
          </div>
        </div>

        <div className={styles.image} aria-hidden="true">
          <div className={styles.visual}>
            <img
              src={getTeamIcon(SITE_TEAM_NAME)}
              alt=""
              className={styles.heroLogo}
              onError={(event) => {
                if (!event.currentTarget.src.includes(DEFAULT_TEAM_ICON)) {
                  event.currentTarget.src = DEFAULT_TEAM_ICON;
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
