// src/pages/admin/ui/AdminDashboard/AdminDashboard.tsx

import type { ContactMessage } from '@pages/contacts/model/types';
import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';
import { galleryItems } from '@pages/gallery/model/mockData';
import { newsItems } from '@pages/news/model/mockData';
import { Card } from '@shared/ui';

import type { AdminSection } from '../../model/types';

import styles from './AdminDashboard.module.css';

type AdminDashboardProps = {
  playersCount: number;
  messages: ContactMessage[];
  ticketRequests: TicketRequest[];
  onSelectSection: (section: AdminSection) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function AdminDashboard({
  playersCount,
  messages,
  ticketRequests,
  onSelectSection,
}: AdminDashboardProps) {
  const unreadMessages = messages.filter((message) => !message.read);
  const unreadTicketRequests = ticketRequests.filter(
    (request) => !request.read,
  );

  const latestMessages = [...messages]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const latestTicketRequests = [...ticketRequests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  const stats = [
    {
      icon: '👥',
      value: String(playersCount),
      label: 'Игроков',
    },
    {
      icon: '📰',
      value: String(newsItems.length),
      label: 'Новостей',
    },
    {
      icon: '🖼️',
      value: String(galleryItems.length),
      label: 'Фото в галерее',
    },
    {
      icon: '💬',
      value: String(messages.length),
      label: 'Сообщений',
    },
    {
      icon: '🎟️',
      value: String(ticketRequests.length),
      label: 'Заявок на билеты',
    },
    {
      icon: '🔔',
      value: String(unreadMessages.length + unreadTicketRequests.length),
      label: 'Новых обращений',
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>Статистика</h2>
          <p>Краткая сводка по сайту и обращениям пользователей</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Card className={styles.statCard} key={stat.label}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.dashboardGrid}>
        <Card className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <div>
              <h3>Последние сообщения</h3>
              <p>Сообщения из формы контактов</p>
            </div>

            <button
              className={styles.inlineButton}
              type="button"
              onClick={() => onSelectSection('messages')}
            >
              Открыть
            </button>
          </div>

          {latestMessages.length > 0 ? (
            <div className={styles.previewList}>
              {latestMessages.map((message) => (
                <article className={styles.previewItem} key={message.id}>
                  <strong>{message.name}</strong>
                  <p>{message.message}</p>
                  <span>{formatDate(message.date)}</span>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>Сообщений пока нет</p>
          )}
        </Card>

        <Card className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <div>
              <h3>Последние заявки</h3>
              <p>Заявки на билеты из расписания</p>
            </div>

            <button
              className={styles.inlineButton}
              type="button"
              onClick={() => onSelectSection('tickets')}
            >
              Открыть
            </button>
          </div>

          {latestTicketRequests.length > 0 ? (
            <div className={styles.previewList}>
              {latestTicketRequests.map((request) => (
                <article className={styles.previewItem} key={request.id}>
                  <strong>{request.name}</strong>
                  <p>
                    {request.matchTitle}, билетов: {request.ticketCount}
                  </p>
                  <span>{formatDate(request.createdAt)}</span>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>Заявок пока нет</p>
          )}
        </Card>
      </div>
    </div>
  );
}
