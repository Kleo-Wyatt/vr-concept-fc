import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createNews,
  deleteNews,
  getNews,
  newsQueryKeys,
  updateNews,
  type NewsItem,
  type NewsPayload,
} from '@entities/news';
import { showMutationError } from '@shared/lib/feedback/showMutationError';

const EMPTY_NEWS: NewsItem[] = [];

export function useAdminNews() {
  const queryClient = useQueryClient();

  const newsQuery = useQuery({
    queryKey: newsQueryKeys.all,
    queryFn: getNews,
  });

  const invalidateNews = () =>
    queryClient.invalidateQueries({
      queryKey: newsQueryKeys.all,
    });

  const createNewsMutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      void invalidateNews();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось добавить новость');
    },
  });

  const updateNewsMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: NewsPayload }) =>
      updateNews(id, payload),
    onSuccess: () => {
      void invalidateNews();
    },
    onError: (error) => {
      showMutationError(error, 'Не удалось обновить новость');
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: deleteNews,
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
