import { apiRequest } from '@shared/api/http';

export type TeamPlayer = {
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

export function getTeamPlayers() {
  return apiRequest<TeamPlayer[]>('/players');
}
