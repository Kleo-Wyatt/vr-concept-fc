import { Button, Card } from '@shared/ui';

import type { ContactMessage } from '@pages/contacts/model/types';
import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';

import type { AdminNewsItem, NewsPayload } from '../../model/newsApi';
import type { Player, PlayerPayload } from '../../model/playersApi';
import type {
  AdminScheduleEvent,
  ScheduleEventPayload,
} from '../../model/scheduleEventsApi';
import type { AdminSection } from '../../model/types';

import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { AdminMessages } from '../AdminMessages/AdminMessages';
import { AdminNews } from '../AdminNews/AdminNews';
import { AdminPlayers } from '../AdminPlayers/AdminPlayers';
import { AdminScheduleEvents } from '../AdminScheduleEvents/AdminScheduleEvents';
import { AdminTicketRequests } from '../AdminTicketRequests/AdminTicketRequests';

import styles from './AdminSectionContent.module.css';

type AdminSectionContentProps = {
  activeSection: AdminSection;

  players: Player[];
  scheduleEvents: AdminScheduleEvent[];
  news: AdminNewsItem[];
  messages: ContactMessage[];
  ticketRequests: TicketRequest[];

  isLoading: boolean;
  loadError: string;

  onRefresh: () => Promise<void>;
  onSelectSection: (section: AdminSection) => void;

  onCreatePlayer: (payload: PlayerPayload) => Promise<void>;
  onUpdatePlayer: (id: number, payload: PlayerPayload) => Promise<void>;
  onDeletePlayer: (id: number) => Promise<void>;

  onCreateScheduleEvent: (payload: ScheduleEventPayload) => Promise<void>;
  onUpdateScheduleEvent: (
    id: number,
    payload: ScheduleEventPayload,
  ) => Promise<void>;
  onDeleteScheduleEvent: (id: number) => Promise<void>;

  onCreateNews: (payload: NewsPayload) => Promise<void>;
  onUpdateNews: (id: number, payload: NewsPayload) => Promise<void>;
  onDeleteNews: (id: number) => Promise<void>;

  onMarkMessageAsRead: (id: number) => Promise<void>;
  onDeleteMessage: (id: number) => Promise<void>;

  onMarkTicketRequestAsRead: (id: number) => Promise<void>;
  onDeleteTicketRequest: (id: number) => Promise<void>;
};

export function AdminSectionContent({
  activeSection,

  players,
  scheduleEvents,
  news,
  messages,
  ticketRequests,

  isLoading,
  loadError,

  onRefresh,
  onSelectSection,

  onCreatePlayer,
  onUpdatePlayer,
  onDeletePlayer,

  onCreateScheduleEvent,
  onUpdateScheduleEvent,
  onDeleteScheduleEvent,

  onCreateNews,
  onUpdateNews,
  onDeleteNews,

  onMarkMessageAsRead,
  onDeleteMessage,

  onMarkTicketRequestAsRead,
  onDeleteTicketRequest,
}: AdminSectionContentProps) {
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
          <Button onClick={onRefresh}>Повторить загрузку</Button>
        </div>
      </Card>
    );
  }

  if (activeSection === 'players') {
    return (
      <AdminPlayers
        players={players}
        onRefresh={onRefresh}
        onCreate={onCreatePlayer}
        onUpdate={onUpdatePlayer}
        onDelete={onDeletePlayer}
      />
    );
  }

  if (activeSection === 'schedule') {
    return (
      <AdminScheduleEvents
        scheduleEvents={scheduleEvents}
        onRefresh={onRefresh}
        onCreate={onCreateScheduleEvent}
        onUpdate={onUpdateScheduleEvent}
        onDelete={onDeleteScheduleEvent}
      />
    );
  }

  if (activeSection === 'news') {
    return (
      <AdminNews
        news={news}
        onRefresh={onRefresh}
        onCreate={onCreateNews}
        onUpdate={onUpdateNews}
        onDelete={onDeleteNews}
      />
    );
  }

  if (activeSection === 'messages') {
    return (
      <AdminMessages
        messages={messages}
        onRefresh={onRefresh}
        onMarkAsRead={onMarkMessageAsRead}
        onDelete={onDeleteMessage}
      />
    );
  }

  if (activeSection === 'tickets') {
    return (
      <AdminTicketRequests
        ticketRequests={ticketRequests}
        onRefresh={onRefresh}
        onMarkAsRead={onMarkTicketRequestAsRead}
        onDelete={onDeleteTicketRequest}
      />
    );
  }

  return (
    <AdminDashboard
      playersCount={players.length}
      newsCount={news.length}
      messages={messages}
      ticketRequests={ticketRequests}
      onSelectSection={onSelectSection}
    />
  );
}
