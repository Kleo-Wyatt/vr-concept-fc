import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { isAuthenticated } from '@features/auth/model/authToken';
import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './Navigation.module.css';

type NavigationProps = {
  className?: string;
};

export function Navigation({ className = '' }: NavigationProps) {
  const navigationClassName = clsx(styles.navigation, className);
  const isAdminAuthenticated = isAuthenticated();

  const adminLinkPath = isAdminAuthenticated ? AppRoute.admin : '/admin/login';
  const adminLinkLabel = isAdminAuthenticated ? 'Админ' : 'Войти';

  return (
    <nav className={navigationClassName} aria-label="Основная навигация">
      <ul className={styles.list}>
        {navigationItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx(styles.link, isActive && styles.active)
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}

        <li>
          <NavLink
            to={adminLinkPath}
            className={({ isActive }) =>
              clsx(styles.adminLink, isActive && styles.adminLinkActive)
            }
          >
            {adminLinkLabel}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
