import { apiRequest } from '@shared/api/http';

export type LoginPayload = {
  login: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    login: string;
    role: 'admin';
  };
};

export function loginAdmin(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  });
}
