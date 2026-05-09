import { useState } from 'react';

import { useAdminData } from '../hooks/useAdminData';
import type { AdminSection } from '../model/types';

import { AdminHeader } from './AdminHeader/AdminHeader';
import { AdminSectionContent } from './AdminSectionContent/AdminSectionContent';
import { AdminSidebar } from './AdminSidebar/AdminSidebar';

import styles from './AdminPage.module.css';

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const {
    players,
    messages,
    ticketRequests,

    isLoading,
    loadError,

    unreadMessagesCount,
    unreadTicketRequestsCount,

    refreshAdminData,

    handleMarkMessageAsRead,
    handleDeleteMessage,

    handleMarkTicketRequestAsRead,
    handleDeleteTicketRequest,

    handleCreatePlayer,
    handleUpdatePlayer,
    handleDeletePlayer,
  } = useAdminData();

  return (
    <div className={styles.layout}>
      <AdminSidebar
        activeSection={activeSection}
        unreadMessagesCount={unreadMessagesCount}
        unreadTicketRequestsCount={unreadTicketRequestsCount}
        onSelectSection={setActiveSection}
      />

      <main className={styles.content}>
        <AdminHeader />

        <section className={styles.section}>
          <AdminSectionContent
            activeSection={activeSection}
            players={players}
            messages={messages}
            ticketRequests={ticketRequests}
            isLoading={isLoading}
            loadError={loadError}
            onRefresh={refreshAdminData}
            onSelectSection={setActiveSection}
            onCreatePlayer={handleCreatePlayer}
            onUpdatePlayer={handleUpdatePlayer}
            onDeletePlayer={handleDeletePlayer}
            onMarkMessageAsRead={handleMarkMessageAsRead}
            onDeleteMessage={handleDeleteMessage}
            onMarkTicketRequestAsRead={handleMarkTicketRequestAsRead}
            onDeleteTicketRequest={handleDeleteTicketRequest}
          />
        </section>
      </main>
    </div>
  );
}
