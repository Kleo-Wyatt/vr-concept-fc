import { useMemo, useState } from 'react';

import type { ContactMessage } from '@entities/contact-message';
import { Button, Card, FilterTabs, type FilterTabItem } from '@shared/ui';
import { formatDateTimeRu } from '@shared/lib/date';

import { AdminSectionHeader } from '../AdminSectionHeader/AdminSectionHeader';
import {
  type AdminInfoGridItem,
  AdminInfoGrid,
} from '../AdminInfoGrid/AdminInfoGrid';

import styles from './AdminMessages.module.css';
import { AdminListItem } from '../AdminListItem/AdminListItem';
import { AdminMasterDetailLayout } from '../AdminMasterDetailLayout/AdminMasterDetailLayout';
import { AdminDetailHeader } from '../AdminDetailHeader/AdminDetailHeader';

type MessageFilter = 'all' | 'unread' | 'read';

type AdminMessagesProps = {
  messages: ContactMessage[];
  onRefresh: () => void;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
};

export function AdminMessages({
  messages,
  onRefresh,
  onMarkAsRead,
  onDelete,
}: AdminMessagesProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  );
  const [filter, setFilter] = useState<MessageFilter>('all');

  const unreadMessagesCount = useMemo(
    () => messages.filter((message) => !message.read).length,
    [messages],
  );

  const readMessagesCount = messages.length - unreadMessagesCount;

  const filterItems: FilterTabItem<MessageFilter>[] = [
    {
      value: 'all',
      label: `Все (${messages.length})`,
    },
    {
      value: 'unread',
      label: `Непрочитано (${unreadMessagesCount})`,
    },
    {
      value: 'read',
      label: `Прочитано (${readMessagesCount})`,
    },
  ];

  const selectedMessage = useMemo(
    () => messages.find((message) => message.id === selectedMessageId) ?? null,
    [messages, selectedMessageId],
  );

  const filteredMessages = useMemo(() => {
    if (filter === 'unread') {
      return messages.filter((message) => !message.read);
    }

    if (filter === 'read') {
      return messages.filter((message) => message.read);
    }

    return messages;
  }, [filter, messages]);

  const selectedMessageInfoItems: AdminInfoGridItem[] = selectedMessage
    ? [
        {
          label: 'Имя',
          value: <strong>{selectedMessage.name}</strong>,
        },
        {
          label: 'Email',
          value: (
            <a href={`mailto:${selectedMessage.email}`}>
              {selectedMessage.email}
            </a>
          ),
        },
        {
          label: 'Телефон',
          value: <strong>{selectedMessage.phone}</strong>,
          hidden: !selectedMessage.phone,
        },
        {
          label: 'Тема',
          value: <strong>{selectedMessage.subject}</strong>,
          hidden: !selectedMessage.subject,
        },
      ]
    : [];

  const handleSelectMessage = (message: ContactMessage) => {
    setSelectedMessageId(message.id);

    if (!message.read) {
      onMarkAsRead(message.id);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Удалить сообщение?')) {
      onDelete(id);

      if (selectedMessageId === id) {
        setSelectedMessageId(null);
      }
    }
  };

  return (
    <div>
      <AdminSectionHeader
        title="Сообщения"
        description={
          <>
            Всего: {messages.length} · Непрочитано: {unreadMessagesCount}
          </>
        }
        actions={
          <Button variant="secondary" onClick={onRefresh}>
            Обновить
          </Button>
        }
      />

      <FilterTabs
        items={filterItems}
        value={filter}
        onChange={setFilter}
        ariaLabel="Фильтр сообщений"
      />

      <AdminMasterDetailLayout
        list={
          filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <AdminListItem
                key={message.id}
                header={message.name}
                title={message.subject || message.email}
                preview={message.message}
                date={formatDateTimeRu(message.date)}
                unread={!message.read}
                active={selectedMessageId === message.id}
                onClick={() => handleSelectMessage(message)}
              />
            ))
          ) : (
            <Card>
              <p className={styles.emptyText}>Сообщений пока нет</p>
            </Card>
          )
        }
        detail={
          selectedMessage ? (
            <>
              <AdminDetailHeader
                title={`Сообщение от ${selectedMessage.name}`}
                description={formatDateTimeRu(selectedMessage.date)}
                actions={
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    Удалить
                  </Button>
                }
              />

              <AdminInfoGrid items={selectedMessageInfoItems} />

              <div className={styles.messageBody}>
                <h4>Сообщение</h4>
                <p>{selectedMessage.message}</p>
              </div>

              <div className={styles.detailActions}>
                <Button href={`mailto:${selectedMessage.email}`}>
                  Ответить
                </Button>
              </div>
            </>
          ) : (
            <p className={styles.emptyText}>
              Выберите сообщение из списка, чтобы посмотреть детали
            </p>
          )
        }
      />
    </div>
  );
}
