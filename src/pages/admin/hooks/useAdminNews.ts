import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAdminNews,
  deleteAdminNews,
  getAdminNews,
  updateAdminNews,
  type AdminNewsItem,
  type NewsPayload,
} from '../model/newsApi';
import { adminQueryKeys } from '../model/queryKeys';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

const EMPTY_NEWS: AdminNewsItem[] = [];

export function useAdminNews() {
  const queryClient = useQueryClient();

  const newsQuery = useQuery({
    queryKey: adminQueryKeys.news,
    queryFn: getAdminNews,
  });

  const invalidateNews = () =>
    queryClient.invalidateQueries({
      queryKey: adminQueryKeys.news,
    });

  const createNewsMutation = useMutation({
    mutationFn: createAdminNews,
    onSuccess: () => {
      void invalidateNews();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось добавить новость');
    },
  });

  const updateNewsMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: NewsPayload }) =>
      updateAdminNews(id, payload),
    onSuccess: () => {
      void invalidateNews();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить новость');
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: deleteAdminNews,
    onSuccess: () => {
      void invalidateNews();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось удалить новость');
    },
  });

  const handleCreateNews = async (payload: NewsPayload) => {
    await createNewsMutation.mutateAsync(payload);
  };

  const handleUpdateNews = async (id: number, payload: NewsPayload) => {
    await updateNewsMutation.mutateAsync({
      id,
      payload,
    });
  };

  const handleDeleteNews = async (id: number) => {
    await deleteNewsMutation.mutateAsync(id);
  };

  return {
    news: newsQuery.data ?? EMPTY_NEWS,
    isLoading: newsQuery.isLoading,
    error: newsQuery.error,

    handleCreateNews,
    handleUpdateNews,
    handleDeleteNews,
  };
}
