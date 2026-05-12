import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuthenticated } from '../../model/authToken';

export function ProtectedAdminRoute({ children }: PropsWithChildren) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}