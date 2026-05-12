import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { isAuthenticated } from '@features/auth/model/authToken';
import { AppRoute, navigationItems } from '@shared/config/routes';

import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  onClose: () => void;
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  const isAdminAuthenticated = isAuthenticated();

  const adminLinkPath = isAdminAuthenticated ? AppRoute.admin : '/admin/login';
  const adminLinkLabel = isAdminAuthenticated ? 'Админ-панель' : 'Войти';

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
                clsx(styles.link, styles.adminLink, isActive && styles.active)
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
