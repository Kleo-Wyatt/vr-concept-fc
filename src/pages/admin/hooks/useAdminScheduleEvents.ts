import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createScheduleEvent,
  deleteScheduleEvent,
  getScheduleEvents,
  scheduleEventQueryKeys,
  updateScheduleEvent,
  type ScheduleEvent,
  type ScheduleEventPayload,
} from '@entities/schedule-event';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

const EMPTY_SCHEDULE_EVENTS: ScheduleEvent[] = [];

export function useAdminScheduleEvents() {
  const queryClient = useQueryClient();

  const scheduleEventsQuery = useQuery({
    queryKey: scheduleEventQueryKeys.all,
    queryFn: getScheduleEvents,
  });

  const invalidateScheduleEvents = () =>
    queryClient.invalidateQueries({
      queryKey: scheduleEventQueryKeys.all,
    });

  const createScheduleEventMutation = useMutation({
    mutationFn: createScheduleEvent,
    onSuccess: () => {
      void invalidateScheduleEvents();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось добавить событие');
    },
  });

  const updateScheduleEventMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ScheduleEventPayload;
    }) => updateScheduleEvent(id, payload),
    onSuccess: () => {
      void invalidateScheduleEvents();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить событие');
    },
  });

  const deleteScheduleEventMutation = useMutation({
    mutationFn: deleteScheduleEvent,
    onSuccess: () => {
      void invalidateScheduleEvents();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось удалить событие');
    },
  });

  const handleCreateScheduleEvent = async (payload: ScheduleEventPayload) => {
    await createScheduleEventMutation.mutateAsync(payload);
  };

  const handleUpdateScheduleEvent = async (
    id: number,
    payload: ScheduleEventPayload,
  ) => {
    await updateScheduleEventMutation.mutateAsync({
      id,
      payload,
    });
  };

  const handleDeleteScheduleEvent = async (id: number) => {
    await deleteScheduleEventMutation.mutateAsync(id);
  };

  return {
    scheduleEvents: scheduleEventsQuery.data ?? EMPTY_SCHEDULE_EVENTS,
    isLoading: scheduleEventsQuery.isLoading,
    error: scheduleEventsQuery.error,

    handleCreateScheduleEvent,
    handleUpdateScheduleEvent,
    handleDeleteScheduleEvent,
  };
}
