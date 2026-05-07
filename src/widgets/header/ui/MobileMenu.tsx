import { NavLink } from 'react-router-dom';

import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './MobileMenu.module.css';import clsx from 'clsx';


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
                  clsx(
                    styles.link,
                    isActive && styles.active,
                  )
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
                clsx(
                  styles.link,
                  styles.adminLink,
                  isActive && styles.active,
                )
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