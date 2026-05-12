import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

import { getAuthToken, removeAuthToken } from '@features/auth/model/authToken';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

type ApiErrorResponse = {
  message?: string;
};

type ApiRequestOptions = Omit<AxiosRequestConfig, 'url' | 'data'> & {
  body?: unknown;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      removeAuthToken();
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ApiErrorResponse | undefined;

    return responseData?.message || error.message || 'Ошибка запроса к серверу';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ошибка запроса к серверу';
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, ...requestConfig } = options;

  const response = await apiClient.request<T>({
    url: path,
    data: body,
    ...requestConfig,
  });

  return response.data;
}
