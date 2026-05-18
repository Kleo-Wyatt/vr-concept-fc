import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { getCurrentAdmin } from '@features/auth';

import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  onClose: () => void;
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  const adminQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getCurrentAdmin,
    retry: false,
  });

  const isAdmin = adminQuery.isSuccess;
  const adminLinkPath = isAdmin ? AppRoute.admin : '/admin/login';
  const adminLinkLabel = isAdmin ? 'Админ' : 'Войти';

  return (
    <nav className={styles.menu} aria-label="Мобильная навигация">
      <div className={styles.content}>
        <ul className={styles.list}>
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(styles.link, isActive && styles.active)
                }
                onClick={onClose}
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
              onClick={onClose}
            >
              {adminLinkLabel}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
