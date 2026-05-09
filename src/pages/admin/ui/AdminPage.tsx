import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { AppRoute } from '@shared/config/routes';
import { Button, Card } from '@shared/ui';
import type { ContactMessage } from '@pages/contacts/model/types';
import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';

import {
  deleteAdminContactMessage,
  deleteAdminTicketRequest,
  getAdminContactMessages,
  getAdminTicketRequests,
  markAdminContactMessageAsRead,
  markAdminTicketRequestAsRead,
} from '../model/adminStorage';
import {
  createAdminPlayer,
  deleteAdminPlayer,
  getAdminPlayers,
  updateAdminPlayer,
  type Player,
  type PlayerPayload,
} from '../model/playersApi';
import type { AdminNavItem, AdminSection } from '../model/types';

import { AdminDashboard } from './AdminDashboard/AdminDashboard';
import { AdminMessages } from './AdminMessages/AdminMessages';
import { AdminPlayers } from './AdminPlayers/AdminPlayers';
import { AdminTicketRequests } from './AdminTicketRequests/AdminTicketRequests';

import styles from './AdminPage.module.css';

const adminNavItems: AdminNavItem[] = [
  {
    id: 'dashboard',
    label: 'Статистика',
    icon: '📊',
  },
  {
    id: 'players',
    label: 'Игроки',
    icon: '👥',
  },
  {
    id: 'messages',
    label: 'Сообщения',
    icon: '💬',
  },
  {
    id: 'tickets',
    label: 'Заявки на билеты',
    icon: '🎟️',
  },
];

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const [players, setPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [ticketRequests, setTicketRequests] = useState<TicketRequest[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const unreadMessagesCount = useMemo(
    () => messages.filter((message) => !message.read).length,
    [messages],
  );

  const unreadTicketRequestsCount = useMemo(
    () => ticketRequests.filter((request) => !request.read).length,
    [ticketRequests],
  );

  const refreshAdminData = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');

    try {
      const [nextMessages, nextTicketRequests, nextPlayers] = await Promise.all(
        [
          getAdminContactMessages(),
          getAdminTicketRequests(),
          getAdminPlayers(),
        ],
      );

      setMessages(nextMessages);
      setTicketRequests(nextTicketRequests);
      setPlayers(nextPlayers);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : 'Не удалось загрузить данные админ-панели',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAdminData();
  }, [refreshAdminData]);

  const handleMarkMessageAsRead = async (id: number) => {
    try {
      const nextMessages = await markAdminContactMessageAsRead(id);

      setMessages(nextMessages);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Не удалось обновить сообщение',
      );
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      const nextMessages = await deleteAdminContactMessage(id);

      setMessages(nextMessages);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось удалить сообщение',
      );
    }
  };

  const handleMarkTicketRequestAsRead = async (id: number) => {
    try {
      const nextRequests = await markAdminTicketRequestAsRead(id);

      setTicketRequests(nextRequests);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось обновить заявку',
      );
    }
  };

  const handleDeleteTicketRequest = async (id: number) => {
    try {
      const nextRequests = await deleteAdminTicketRequest(id);

      setTicketRequests(nextRequests);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Не удалось удалить заявку',
      );
    }
  };

  const handleCreatePlayer = async (payload: PlayerPayload) => {
    await createAdminPlayer(payload);

    const nextPlayers = await getAdminPlayers();

    setPlayers(nextPlayers);
  };

  const handleUpdatePlayer = async (id: number, payload: PlayerPayload) => {
    await updateAdminPlayer(id, payload);

    const nextPlayers = await getAdminPlayers();

    setPlayers(nextPlayers);
  };

  const handleDeletePlayer = async (id: number) => {
    await deleteAdminPlayer(id);

    const nextPlayers = await getAdminPlayers();

    setPlayers(nextPlayers);
  };

  const renderSection = () => {
    if (isLoading) {
      return (
        <Card>
          <p className={styles.emptyText}>Загрузка данных...</p>
        </Card>
      );
    }

    if (loadError) {
      return (
        <Card>
          <div className={styles.errorBox}>
            <p>{loadError}</p>
            <Button onClick={refreshAdminData}>Повторить загрузку</Button>
          </div>
        </Card>
      );
    }

    if (activeSection === 'players') {
      return (
        <AdminPlayers
          players={players}
          onRefresh={refreshAdminData}
          onCreate={handleCreatePlayer}
          onUpdate={handleUpdatePlayer}
          onDelete={handleDeletePlayer}
        />
      );
    }

    if (activeSection === 'messages') {
      return (
        <AdminMessages
          messages={messages}
          onRefresh={refreshAdminData}
          onMarkAsRead={handleMarkMessageAsRead}
          onDelete={handleDeleteMessage}
        />
      );
    }

    if (activeSection === 'tickets') {
      return (
        <AdminTicketRequests
          ticketRequests={ticketRequests}
          onRefresh={refreshAdminData}
          onMarkAsRead={handleMarkTicketRequestAsRead}
          onDelete={handleDeleteTicketRequest}
        />
      );
    }

    return (
      <AdminDashboard
        playersCount={players.length}
        messages={messages}
        ticketRequests={ticketRequests}
        onSelectSection={setActiveSection}
      />
    );
  };

  return (
    <div className={styles.layout}>
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
                onClick={() => setActiveSection(item.id)}
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
          <p>Версия 2.0</p>
        </div>
      </aside>

      <main className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Админ-панель</h1>
            <p>Управление данными сайта VR CONCEPT FC</p>
          </div>

          <Button as={Link} to={AppRoute.home} variant="secondary">
            Вернуться на сайт
          </Button>
        </header>

        <section className={styles.section}>{renderSection()}</section>
      </main>
    </div>
  );
}
