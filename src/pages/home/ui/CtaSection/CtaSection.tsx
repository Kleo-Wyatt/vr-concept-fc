import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { Button } from '@shared/ui';

import styles from './CtaSection.module.css';

export function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Хотите присоединиться к команде?</h2>
        <p className={styles.text}>
          Мы ищем талантливых игроков для пополнения состава
        </p>

        <Button as={Link} to={AppRoute.contacts} variant="cta" size="large">
          Свяжитесь с нами
        </Button>
      </div>
    </section>
  );
}
