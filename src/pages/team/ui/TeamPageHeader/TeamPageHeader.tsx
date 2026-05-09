import styles from './TeamPageHeader.module.css';

export function TeamPageHeader() {
  return (
    <section className={styles.pageHeader}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Состав команды</h1>
        <p className={styles.pageDescription}>Игроки VR CONCEPT FC</p>
      </div>
    </section>
  );
}
