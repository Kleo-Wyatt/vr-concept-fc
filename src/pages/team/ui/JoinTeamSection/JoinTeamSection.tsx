import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { Button, Card } from '@shared/ui';

import styles from './JoinTeamSection.module.css';

export function JoinTeamSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Хотите присоединиться?</h2>

        <div className={styles.requirementsGrid}>
          <Card className={styles.requirementCard}>
            <h3>Требования к игрокам</h3>

            <ul>
              <li>⚽ Желание играть и развиваться</li>
              <li>🤝 Командный дух и ответственность</li>
              <li>🏃 Готовность посещать тренировки</li>
              <li>📋 Соблюдение правил команды</li>
            </ul>
          </Card>

          <Card className={styles.requirementCard}>
            <h3>Что мы предлагаем</h3>

            <ul>
              <li>🏟️ Регулярные тренировки и матчи</li>
              <li>👕 Командную экипировку</li>
              <li>🏆 Участие в турнирах</li>
              <li>💪 Дружную спортивную атмосферу</li>
            </ul>
          </Card>
        </div>

        <div className={styles.contactBlock}>
          <h3>Свяжитесь с нами</h3>
          <p>
            Заполните форму обратной связи, если хотите присоединиться к команде
            или задать вопрос тренерскому штабу.
          </p>

          <Button as={Link} to={AppRoute.contacts} size="large">
            Написать нам
          </Button>
        </div>
      </div>
    </section>
  );
}
