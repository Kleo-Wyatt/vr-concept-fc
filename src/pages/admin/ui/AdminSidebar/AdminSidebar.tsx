import clsx from 'clsx';

import { adminNavItems } from '../../model/adminNav';
import type { AdminSection } from '../../model/types';

import styles from './AdminSidebar.module.css';

type AdminSidebarProps = {
  activeSection: AdminSection;
  unreadMessagesCount: number;
  unreadTicketRequestsCount: number;
  onSelectSection: (section: AdminSection) => void;
};

export function AdminSidebar({
  activeSection,
  unreadMessagesCount,
  unreadTicketRequestsCount,
  onSelectSection,
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
            <button
              className={clsx(
                styles.navItem,
                activeSection === item.id && styles.navItemActive,
              )}
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>

              {badgeCount > 0 && (
                <span className={styles.navBadge}>{badgeCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <p>© {new Date().getFullYear()} VR CONCEPT FC</p>
        <p>Версия 1.0</p>
      </div>
    </aside>
  );
}
