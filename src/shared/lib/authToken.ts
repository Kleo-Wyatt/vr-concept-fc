const AUTH_TOKEN_STORAGE_KEY = 'vr_concept_fc_admin_jwt';

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}
