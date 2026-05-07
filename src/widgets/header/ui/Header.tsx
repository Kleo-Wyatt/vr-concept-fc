import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';

import { MobileMenu } from './MobileMenu';
import { Navigation } from './Navigation';

import styles from './Header.module.css';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={AppRoute.home} className={styles.logo} onClick={closeMobileMenu}>
          <span className={styles.logoIcon}>⚽</span>
          <span className={styles.logoText}>VR CONCEPT FC</span>
        </Link>

        <Navigation className={styles.desktopNavigation} />

        <button
          className={styles.mobileMenuButton}
          type="button"
          aria-label="Открыть меню"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
          <span className={styles.hamburger} />
        </button>
      </div>

      {isMobileMenuOpen && <MobileMenu onClose={closeMobileMenu} />}
    </header>
  );
}