import { NavLink } from 'react-router-dom';

import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './Navigation.module.css';import clsx from 'clsx';


type NavigationProps = {
  className?: string;
};

export function Navigation({ className = '' }: NavigationProps) {
  const navigationClassName = clsx(
    styles.navigation,
    className,
  );

  return (
    <nav className={navigationClassName} aria-label="Основная навигация">
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
                styles.adminLink,
                isActive && styles.adminLinkActive,
              )
            }
          >
            Админ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
