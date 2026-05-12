import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAdminScheduleEvent,
  deleteAdminScheduleEvent,
  getAdminScheduleEvents,
  updateAdminScheduleEvent,
  type AdminScheduleEvent,
  type ScheduleEventPayload,
} from '../model/scheduleEventsApi';
import { adminQueryKeys } from '../model/queryKeys';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

const EMPTY_SCHEDULE_EVENTS: AdminScheduleEvent[] = [];

export function useAdminScheduleEvents() {
  const queryClient = useQueryClient();

  const scheduleEventsQuery = useQuery({
    queryKey: adminQueryKeys.scheduleEvents,
    queryFn: getAdminScheduleEvents,
  });

  const invalidateScheduleEvents = () =>
    queryClient.invalidateQueries({
      queryKey: adminQueryKeys.scheduleEvents,
    });

  const createScheduleEventMutation = useMutation({
    mutationFn: createAdminScheduleEvent,
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
    }) => updateAdminScheduleEvent(id, payload),
    onSuccess: () => {
      void invalidateScheduleEvents();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить событие');
    },
  });

  const deleteScheduleEventMutation = useMutation({
    mutationFn: deleteAdminScheduleEvent,
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
