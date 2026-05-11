import { useMemo, useState } from 'react';

import type { TicketRequest } from '@pages/schedule/model/ticketRequestStorage';
import { Button, Card, FilterTabs, type FilterTabItem } from '@shared/ui';

import styles from './AdminTicketRequests.module.css';
import { formatDateTimeRu, formatMatchDateTimeRu } from '@shared/lib/date';

type RequestFilter = 'all' | 'unread' | 'read';

type AdminTicketRequestsProps = {
  ticketRequests: TicketRequest[];
  onRefresh: () => void;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
};

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

  const unreadRequestsCount = useMemo(
    () => ticketRequests.filter((request) => !request.read).length,
    [ticketRequests],
  );

  const readRequestsCount = ticketRequests.length - unreadRequestsCount;

  const filterItems: FilterTabItem<RequestFilter>[] = [
    {
      value: 'all',
      label: `Все (${ticketRequests.length})`,
    },
    {
      value: 'unread',
      label: `Непрочитано (${unreadRequestsCount})`,
    },
    {
      value: 'read',
      label: `Прочитано (${readRequestsCount})`,
    },
  ];

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
            Всего: {ticketRequests.length} · Непрочитано: {unreadRequestsCount}
          </p>
        </div>

        <Button variant="secondary" onClick={onRefresh}>
          Обновить
        </Button>
      </div>

      <FilterTabs
        items={filterItems}
        value={filter}
        onChange={setFilter}
        ariaLabel="Фильтр заявок на билеты"
      />

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
                  {formatDateTimeRu(request.createdAt)}
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
                  <p>{formatDateTimeRu(selectedRequest.createdAt)}</p>
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
                    {formatMatchDateTimeRu(
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
