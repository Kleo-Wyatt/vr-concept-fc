import { apiClient, apiRequest } from '@shared/api/http';

export type Player = {
  id: number;
  number: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  joinedDate: string;
  height: string;
  weight: string;
};

export type PlayerPayload = Omit<Player, 'id'>;

type UploadPlayerPhotoResponse = {
  image: string;
};

export function getAdminPlayers() {
  return apiRequest<Player[]>('/players');
}

export function createAdminPlayer(payload: PlayerPayload) {
  return apiRequest<Player>('/players', {
    method: 'POST',
    body: payload,
  });
}

export function updateAdminPlayer(id: number, payload: PlayerPayload) {
  return apiRequest<Player>(`/players/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteAdminPlayer(id: number) {
  return apiRequest<void>(`/players/${id}`, {
    method: 'DELETE',
  });
}

export async function uploadAdminPlayerPhoto(file: File) {
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
