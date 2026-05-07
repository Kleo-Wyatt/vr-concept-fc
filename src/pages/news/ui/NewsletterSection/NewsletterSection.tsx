import { Button, Card } from '@shared/ui';

import styles from './NewsletterSection.module.css';

export function NewsletterSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className={styles.container}>
        <Card className={styles.newsletter}>
          <h2>Подпишитесь на новости</h2>
          <p>
            Получайте свежие новости о матчах и событиях команды прямо на вашу
            почту
          </p>

          <form
            className={styles.newsletterForm}
            onSubmit={(event) => {
              event.preventDefault();
              alert('Спасибо за подписку!');
            }}
          >
            <input type="email" placeholder="Ваш email" required />
            <Button type="submit">Подписаться</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
