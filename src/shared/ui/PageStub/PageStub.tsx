import { Card } from '@shared/ui';

import styles from './PageStub.module.css';

type PageStubProps = {
  title: string;
  description: string;
};

export function PageStub({ title, description }: PageStubProps) {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.container}>
          <span className={styles.badge}>VR CONCEPT FC</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <Card>
            <h2 className={styles.cardTitle}>Раздел в разработке</h2>
            <p className={styles.cardText}>
              Здесь позже появится полноценный интерфейс, подключенный к имитации backend API.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}