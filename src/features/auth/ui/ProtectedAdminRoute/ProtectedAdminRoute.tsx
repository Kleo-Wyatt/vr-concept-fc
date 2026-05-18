import type { PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';

import { getCurrentAdmin } from '../../model/authApi';

export function ProtectedAdminRoute({ children }: PropsWithChildren) {
  const location = useLocation();

  const adminQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getCurrentAdmin,
    retry: false,
  });

  if (adminQuery.isLoading) {
    return (
      <main className="container section">
        <p>Проверяем авторизацию...</p>
      </main>
    );
  }

  if (adminQuery.isError) {
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
