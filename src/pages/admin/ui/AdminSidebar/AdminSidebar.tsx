import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { getAdminSectionPath } from '../../lib/adminRoutes';
import { adminNavItems } from '../../model/adminNav';
import type { AdminSection } from '../../model/types';

import styles from './AdminSidebar.module.css';

type AdminSidebarProps = {
  activeSection: AdminSection;
  unreadMessagesCount: number;
  unreadTicketRequestsCount: number;
};

export function AdminSidebar({
  activeSection,
  unreadMessagesCount,
  unreadTicketRequestsCount,
}: AdminSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>VR CONCEPT FC</h2>
        <p className={styles.sidebarSubtitle}>Админ-панель</p>
      </div>

      <nav className={styles.sidebarNav}>
        {adminNavItems.map((item) => {
          const badgeCount =
            item.id === 'messages'
              ? unreadMessagesCount
              : item.id === 'tickets'
                ? unreadTicketRequestsCount
                : 0;

          return (
            <NavLink
              className={clsx(
                styles.navItem,
                activeSection === item.id && styles.navItemActive,
              )}
              key={item.id}
              to={getAdminSectionPath(item.id)}
              end={item.id === 'dashboard'}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>

              {badgeCount > 0 && (
                <span className={styles.navBadge}>{badgeCount}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <p>© 2026 VR CONCEPT FC</p>
        <p>Администрирование сайта</p>
      </div>
    </aside>
  );
}
