import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedAdminRoute } from '@features/auth';

import { AdminLayout } from '@widgets/admin-layout';
import { PublicLayout } from '@widgets/public-layout';

import {
  adminRoutes,
  publicRoutes,
  standaloneRoutes,
  type RouteConfigItem,
} from './config/routeConfig';

function PageLoader() {
  return (
    <main className="container section">
      <p>Загружаем страницу...</p>
    </main>
  );
}

function renderRoute(route: RouteConfigItem) {
  const element = route.authOnly ? (
    <ProtectedAdminRoute>{route.element}</ProtectedAdminRoute>
  ) : (
    route.element
  );

  return <Route key={route.path} path={route.path} element={element} />;
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRoutes.map(renderRoute)}
        </Route>

        <Route element={<AdminLayout />}>{adminRoutes.map(renderRoute)}</Route>

        {standaloneRoutes.map(renderRoute)}
      </Routes>
    </Suspense>
  );
}
