import { NavLink } from 'react-router-dom';

import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './Navigation.module.css';

type NavigationProps = {
  className?: string;
};

export function Navigation({ className = '' }: NavigationProps) {
  const navigationClassName = [styles.navigation, className]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navigationClassName} aria-label="Основная навигация">
      <ul className={styles.list}>
        {navigationItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : '']
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}

        <li>
          <NavLink
            to={AppRoute.admin}
            className={({ isActive }) =>
              [styles.adminLink, isActive ? styles.adminLinkActive : '']
                .filter(Boolean)
                .join(' ')
            }
          >
            Админ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
