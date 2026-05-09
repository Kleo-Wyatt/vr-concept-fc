import { useMemo, useState } from 'react';

import type { ContactMessage } from '@pages/contacts/model/types';
import { Button, Card } from '@shared/ui';

import styles from '../AdminPage.module.css';

type MessageFilter = 'all' | 'unread' | 'read';

type AdminMessagesProps = {
  messages: ContactMessage[];
  onRefresh: () => void;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleString('ru-RU');
}

function getMessagePreview(message: string) {
  return message.length > 100 ? `${message.slice(0, 100)}...` : message;
}

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
      <div className={styles.sectionHeader}>
        <div>
          <h2>Сообщения</h2>
          <p>
            Всего: {messages.length} · Непрочитано:{' '}
            {messages.filter((message) => !message.read).length}
          </p>
        </div>

        <Button variant="secondary" onClick={onRefresh}>
          Обновить
        </Button>
      </div>

      <div className={styles.filters}>
        {[
          { value: 'all', label: `Все (${messages.length})` },
          {
            value: 'unread',
            label: `Непрочитано (${
              messages.filter((message) => !message.read).length
            })`,
          },
          {
            value: 'read',
            label: `Прочитано (${
              messages.filter((message) => message.read).length
            })`,
          },
        ].map((item) => (
          <button
            className={[
              styles.filterButton,
              filter === item.value ? styles.filterButtonActive : '',
            ].join(' ')}
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value as MessageFilter)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.masterDetailLayout}>
        <div className={styles.listPanel}>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <button
                className={[
                  styles.listItem,
                  !message.read ? styles.listItemUnread : '',
                  selectedMessageId === message.id ? styles.listItemActive : '',
                ].join(' ')}
                key={message.id}
                type="button"
                onClick={() => handleSelectMessage(message)}
              >
                <span className={styles.listItemHeader}>
                  <strong>{message.name}</strong>
                  {!message.read && <span className={styles.badge}>Новое</span>}
                </span>

                <span className={styles.listItemTitle}>
                  {message.subject || message.email}
                </span>

                <span className={styles.listItemPreview}>
                  {getMessagePreview(message.message)}
                </span>

                <span className={styles.listItemDate}>
                  {formatDate(message.date)}
                </span>
              </button>
            ))
          ) : (
            <Card>
              <p className={styles.emptyText}>Нет сообщений</p>
            </Card>
          )}
        </div>

        <Card className={styles.detailPanel}>
          {selectedMessage ? (
            <>
              <div className={styles.detailHeader}>
                <div>
                  <h3>Сообщение от {selectedMessage.name}</h3>
                  <p>{formatDate(selectedMessage.date)}</p>
                </div>

                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  Удалить
                </Button>
              </div>

              <div className={styles.detailInfo}>
                <div>
                  <span>Имя</span>
                  <strong>{selectedMessage.name}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <a href={`mailto:${selectedMessage.email}`}>
                    {selectedMessage.email}
                  </a>
                </div>

                {selectedMessage.phone && (
                  <div>
                    <span>Телефон</span>
                    <a href={`tel:${selectedMessage.phone}`}>
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}

                {selectedMessage.subject && (
                  <div>
                    <span>Тема</span>
                    <strong>{selectedMessage.subject}</strong>
                  </div>
                )}
              </div>

              <div className={styles.messageBody}>
                <h4>Сообщение</h4>
                <p>{selectedMessage.message}</p>
              </div>

              <div className={styles.detailActions}>
                <Button as="a" href={`mailto:${selectedMessage.email}`}>
                  Ответить
                </Button>
              </div>
            </>
          ) : (
            <p className={styles.emptyText}>
              Выберите сообщение слева, чтобы посмотреть детали
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
