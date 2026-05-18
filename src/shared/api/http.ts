import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

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
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
