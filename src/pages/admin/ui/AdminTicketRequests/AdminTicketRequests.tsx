import { useMemo, useState } from 'react';

import type { TicketRequest } from '@entities/ticket-request';
import { formatDateTimeRu, formatMatchDateTimeRu } from '@shared/lib/date';
import { Button, Card, FilterTabs, type FilterTabItem } from '@shared/ui';

import {
  type AdminInfoGridItem,
  AdminInfoGrid,
} from '../AdminInfoGrid/AdminInfoGrid';
import { AdminSectionHeader } from '../AdminSectionHeader/AdminSectionHeader';

import styles from './AdminTicketRequests.module.css';
import { AdminListItem } from '../AdminListItem/AdminListItem';
import { AdminMasterDetailLayout } from '../AdminMasterDetailLayout/AdminMasterDetailLayout';
import { AdminDetailHeader } from '../AdminDetailHeader/AdminDetailHeader';

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

  const selectedRequestInfoItems: AdminInfoGridItem[] = selectedRequest
    ? [
        {
          label: 'Имя',
          value: <strong>{selectedRequest.name}</strong>,
        },
        {
          label: 'Email',
          value: (
            <a href={`mailto:${selectedRequest.email}`}>
              {selectedRequest.email}
            </a>
          ),
        },
        {
          label: 'Телефон',
          value: (
            <a href={`tel:${selectedRequest.phone}`}>{selectedRequest.phone}</a>
          ),
          hidden: !selectedRequest.phone,
        },
        {
          label: 'Количество билетов',
          value: <strong>{selectedRequest.ticketCount}</strong>,
        },
        {
          label: 'Дата матча',
          value: (
            <strong>
              {formatMatchDateTimeRu(
                selectedRequest.matchDate,
                selectedRequest.matchTime,
              )}
            </strong>
          ),
        },
        {
          label: 'Место',
          value: <strong>{selectedRequest.location}</strong>,
        },
      ]
    : [];

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
      <AdminSectionHeader
        title="Заявки на билеты"
        description={
          <>
            Всего: {ticketRequests.length} · Непрочитано: {unreadRequestsCount}
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
        ariaLabel="Фильтр заявок на билеты"
      />

      <AdminMasterDetailLayout
        list={
          filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <AdminListItem
                key={request.id}
                header={request.name}
                title={request.matchTitle}
                preview={`Билетов: ${request.ticketCount}`}
                date={formatDateTimeRu(request.createdAt)}
                unread={!request.read}
                active={selectedRequestId === request.id}
                onClick={() => handleSelectRequest(request)}
              />
            ))
          ) : (
            <Card>
              <p className={styles.emptyText}>Нет заявок на билеты</p>
            </Card>
          )
        }
        detail={
          selectedRequest ? (
            <>
              <AdminDetailHeader
                title={selectedRequest.matchTitle}
                description={formatDateTimeRu(selectedRequest.createdAt)}
                actions={
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(selectedRequest.id)}
                  >
                    Удалить
                  </Button>
                }
              />

              <AdminInfoGrid items={selectedRequestInfoItems} />

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
          )
        }
      />
    </div>
  );
}
