import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { removeAuthToken } from '@features/auth';
import {
  AdminSidebar,
  getAdminSectionFromParam,
  getAdminSectionPath,
  isAdminSectionPathParam,
  type AdminSection,
} from '@widgets/admin-sidebar';

import { AppRoute } from '@shared/config/routes';

import { useAdminData } from '../hooks/useAdminData';

import { AdminHeader } from './AdminHeader/AdminHeader';

import { AdminSectionContent } from '@widgets/admin-section-content';

import styles from './AdminPage.module.css';


export function AdminPage() {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();

  const activeSection = getAdminSectionFromParam(section);
  const isValidSection = isAdminSectionPathParam(section);

  const {
    players,
    scheduleEvents,
    news,
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

    handleCreateScheduleEvent,
    handleUpdateScheduleEvent,
    handleDeleteScheduleEvent,

    handleCreateNews,
    handleUpdateNews,
    handleDeleteNews,
  } = useAdminData();

  const handleSelectSection = (nextSection: AdminSection) => {
    navigate(getAdminSectionPath(nextSection));
  };

  const handleLogout = () => {
    removeAuthToken();

    navigate(AppRoute.home, {
      replace: true,
    });
  };

  if (!isValidSection) {
    return <Navigate to={AppRoute.admin} replace />;
  }

  return (
    <div className={styles.layout}>
      <AdminSidebar
        activeSection={activeSection}
        unreadMessagesCount={unreadMessagesCount}
        unreadTicketRequestsCount={unreadTicketRequestsCount}
      />

      <main className={styles.content}>
        <AdminHeader onLogout={handleLogout} />

        <section className={styles.section}>
          <AdminSectionContent
            activeSection={activeSection}
            players={players}
            scheduleEvents={scheduleEvents}
            news={news}
            messages={messages}
            ticketRequests={ticketRequests}
            isLoading={isLoading}
            loadError={loadError}
            onRefresh={refreshAdminData}
            onSelectSection={handleSelectSection}
            onCreatePlayer={handleCreatePlayer}
            onUpdatePlayer={handleUpdatePlayer}
            onDeletePlayer={handleDeletePlayer}
            onCreateScheduleEvent={handleCreateScheduleEvent}
            onUpdateScheduleEvent={handleUpdateScheduleEvent}
            onDeleteScheduleEvent={handleDeleteScheduleEvent}
            onCreateNews={handleCreateNews}
            onUpdateNews={handleUpdateNews}
            onDeleteNews={handleDeleteNews}
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
