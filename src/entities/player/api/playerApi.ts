import { apiClient, apiRequest } from '@shared/api/http';

import type {
  Player,
  PlayerPayload,
  UploadPlayerPhotoResponse,
} from '../model/types';

export function getPlayers() {
  return apiRequest<Player[]>('/players');
}

export function createPlayer(payload: PlayerPayload) {
  return apiRequest<Player>('/players', {
    method: 'POST',
    body: payload,
  });
}

export function updatePlayer(id: number, payload: PlayerPayload) {
  return apiRequest<Player>(`/players/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deletePlayer(id: number) {
  return apiRequest<void>(`/players/${id}`, {
    method: 'DELETE',
  });
}

export async function uploadPlayerPhoto(file: File) {
  const formData = new FormData();

  formData.append('photo', file);

  const response = await apiClient.post<UploadPlayerPhotoResponse>(
    '/uploads/player-photo',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}
