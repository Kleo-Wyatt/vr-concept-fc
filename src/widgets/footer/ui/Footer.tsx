import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <section className={styles.section}>
            <h2 className={styles.title}>VR CONCEPT FC</h2>
            <p className={styles.text}>
              Любительская футбольная команда компании VR Concept. Создана для
              развития спорта и командного духа среди сотрудников.
            </p>

            <div className={styles.socialLinks}>
              <a href="#" aria-label="Вконтакте" className={styles.socialLink}>
                📱
              </a>
              <a href="#" aria-label="Telegram" className={styles.socialLink}>
                ✉️
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                📷
              </a>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.title}>Контакты</h2>

            <ul className={styles.info}>
              <li>
                <span className={styles.label}>Адрес:</span>
                <span>Москва, ул. Инновационная, д. 42</span>
              </li>
              <li>
                <span className={styles.label}>Email:</span>
                <a href="mailto:info@vrconceptfc.ru">info@vrconceptfc.ru</a>
              </li>
              <li>
                <span className={styles.label}>Телефон:</span>
                <a href="tel:+74951234567">+7 (495) 123-45-67</a>
              </li>
            </ul>
          </section>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} VR CONCEPT FC. Все права защищены.
          </p>
          <p className={styles.credits}>Разработано для дипломного проекта</p>
        </div>
      </div>
    </footer>
  );
}
