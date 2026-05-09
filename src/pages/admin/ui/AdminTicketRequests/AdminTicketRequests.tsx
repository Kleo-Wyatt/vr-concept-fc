import { useMemo, useState } from 'react';

import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';
import { Button, Card } from '@shared/ui';

import styles from '../AdminPage.module.css';

type RequestFilter = 'all' | 'unread' | 'read';

type AdminTicketRequestsProps = {
  ticketRequests: TicketRequest[];
  onRefresh: () => void;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleString('ru-RU');
}

function formatMatchDate(date: string, time: string) {
  return `${new Date(date).toLocaleDateString('ru-RU')} в ${time}`;
}

export function AdminTicketRequests({
  ticketRequests,
  onRefresh,
  onMarkAsRead,
  onDelete,
}: AdminTicketRequestsProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  );
  const [filter, setFilter] = useState<RequestFilter>('all');

  const selectedRequest = useMemo(
    () =>
      ticketRequests.find((request) => request.id === selectedRequestId) ??
      null,
    [ticketRequests, selectedRequestId],
  );

  const filteredRequests = useMemo(() => {
    if (filter === 'unread') {
      return ticketRequests.filter((request) => !request.read);
    }

    if (filter === 'read') {
      return ticketRequests.filter((request) => request.read);
    }

    return ticketRequests;
  }, [filter, ticketRequests]);

  const handleSelectRequest = (request: TicketRequest) => {
    setSelectedRequestId(request.id);

    if (!request.read) {
      onMarkAsRead(request.id);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Удалить заявку на билет?')) {
      onDelete(id);

      if (selectedRequestId === id) {
        setSelectedRequestId(null);
      }
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h2>Заявки на билеты</h2>
          <p>
            Всего: {ticketRequests.length} · Непрочитано:{' '}
            {ticketRequests.filter((request) => !request.read).length}
          </p>
        </div>

        <Button variant="secondary" onClick={onRefresh}>
          Обновить
        </Button>
      </div>

      <div className={styles.filters}>
        {[
          { value: 'all', label: `Все (${ticketRequests.length})` },
          {
            value: 'unread',
            label: `Непрочитано (${
              ticketRequests.filter((request) => !request.read).length
            })`,
          },
          {
            value: 'read',
            label: `Прочитано (${
              ticketRequests.filter((request) => request.read).length
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
            onClick={() => setFilter(item.value as RequestFilter)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.masterDetailLayout}>
        <div className={styles.listPanel}>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <button
                className={[
                  styles.listItem,
                  !request.read ? styles.listItemUnread : '',
                  selectedRequestId === request.id ? styles.listItemActive : '',
                ].join(' ')}
                key={request.id}
                type="button"
                onClick={() => handleSelectRequest(request)}
              >
                <span className={styles.listItemHeader}>
                  <strong>{request.name}</strong>
                  {!request.read && <span className={styles.badge}>Новое</span>}
                </span>

                <span className={styles.listItemTitle}>
                  {request.matchTitle}
                </span>

                <span className={styles.listItemPreview}>
                  Билетов: {request.ticketCount}
                </span>

                <span className={styles.listItemDate}>
                  {formatDate(request.createdAt)}
                </span>
              </button>
            ))
          ) : (
            <Card>
              <p className={styles.emptyText}>Нет заявок на билеты</p>
            </Card>
          )}
        </div>

        <Card className={styles.detailPanel}>
          {selectedRequest ? (
            <>
              <div className={styles.detailHeader}>
                <div>
                  <h3>{selectedRequest.matchTitle}</h3>
                  <p>{formatDate(selectedRequest.createdAt)}</p>
                </div>

                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDelete(selectedRequest.id)}
                >
                  Удалить
                </Button>
              </div>

              <div className={styles.detailInfo}>
                <div>
                  <span>Имя</span>
                  <strong>{selectedRequest.name}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <a href={`mailto:${selectedRequest.email}`}>
                    {selectedRequest.email}
                  </a>
                </div>

                {selectedRequest.phone && (
                  <div>
                    <span>Телефон</span>
                    <a href={`tel:${selectedRequest.phone}`}>
                      {selectedRequest.phone}
                    </a>
                  </div>
                )}

                <div>
                  <span>Количество билетов</span>
                  <strong>{selectedRequest.ticketCount}</strong>
                </div>

                <div>
                  <span>Дата матча</span>
                  <strong>
                    {formatMatchDate(
                      selectedRequest.matchDate,
                      selectedRequest.matchTime,
                    )}
                  </strong>
                </div>

                <div>
                  <span>Место</span>
                  <strong>{selectedRequest.location}</strong>
                </div>
              </div>

              {selectedRequest.comment && (
                <div className={styles.messageBody}>
                  <h4>Комментарий</h4>
                  <p>{selectedRequest.comment}</p>
                </div>
              )}

              <div className={styles.detailActions}>
                <Button as="a" href={`mailto:${selectedRequest.email}`}>
                  Ответить
                </Button>
              </div>
            </>
          ) : (
            <p className={styles.emptyText}>
              Выберите заявку слева, чтобы посмотреть детали
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
