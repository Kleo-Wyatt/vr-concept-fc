import { apiRequest } from '@shared/api/http';

export type LoginPayload = {
  login: string;
  password: string;
};

export type AdminUser = {
  login: string;
  role: 'admin';
};

export type LoginResponse = {
  user: AdminUser;
};

export type CurrentAdminResponse = {
  user: AdminUser;
};

export function loginAdmin(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export function logoutAdmin() {
  return apiRequest<void>('/auth/logout', {
    method: 'POST',
  });
}

export function getCurrentAdmin() {
  return apiRequest<CurrentAdminResponse>('/auth/me');
}
