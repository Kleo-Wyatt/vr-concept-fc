import { NavLink } from 'react-router-dom';

import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  onClose: () => void;
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <nav className={styles.menu} aria-label="Мобильная навигация">
      <div className={styles.content}>
        <ul className={styles.list}>
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
                }
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to={AppRoute.admin}
              className={({ isActive }) =>
                [styles.link, styles.adminLink, isActive ? styles.active : '']
                  .filter(Boolean)
                  .join(' ')
              }
              onClick={onClose}
            >
              Админ-панель
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}