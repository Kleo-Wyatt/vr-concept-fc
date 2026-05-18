import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { getCurrentAdmin } from '@features/auth';

import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './Navigation.module.css';

type NavigationProps = {
  className?: string;
};

export function Navigation({ className = '' }: NavigationProps) {
  const adminQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getCurrentAdmin,
    retry: false,
  });

  const isAdmin = adminQuery.isSuccess;
  const adminLinkPath = isAdmin ? AppRoute.admin : '/admin/login';
  const adminLinkLabel = isAdmin ? 'Админ' : 'Войти';

  const navigationClassName = clsx(styles.navigation, className);

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
