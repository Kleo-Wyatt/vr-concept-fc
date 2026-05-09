const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

type ApiRequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, headers, ...requestOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let message = 'Ошибка запроса к серверу';

    try {
      const errorBody = (await response.json()) as { message?: string };

      if (errorBody.message) {
        message = errorBody.message;
      }
    } catch {
      // Ответ сервера не JSON — оставляем стандартное сообщение.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
