export { LoginPage } from './ui/LoginPage';
export { ProtectedAdminRoute } from './ui/ProtectedAdminRoute';

export type { LoginPayload, LoginResponse } from './model/authApi';
export { loginAdmin } from './model/authApi';

export {
  getAuthToken,
  isAuthenticated,
  removeAuthToken,
  setAuthToken,
} from './model/authToken';
