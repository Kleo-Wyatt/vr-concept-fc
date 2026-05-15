import { Route, Routes } from 'react-router-dom';

import { AboutPage } from '@pages/about';
import { AdminPage } from '@pages/admin';
import { ContactsPage } from '@pages/contacts';
import { GalleryPage } from '@pages/gallery';
import { HomePage } from '@pages/home';
import { NewsPage } from '@pages/news';
import { NotFoundPage } from '@pages/not-found';
import { SchedulePage } from '@pages/schedule';
import { StandingsPage } from '@pages/standings';
import { TeamPage } from '@pages/team';

import { AdminLayout } from '@widgets/admin-layout';
import { PublicLayout } from '@widgets/public-layout';

import { LoginPage, ProtectedAdminRoute } from '@features/auth';

import { AppRoute } from '@shared/config/routes';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={AppRoute.home} element={<HomePage />} />
        <Route path={AppRoute.about} element={<AboutPage />} />
        <Route path={AppRoute.team} element={<TeamPage />} />
        <Route path={AppRoute.schedule} element={<SchedulePage />} />
        <Route path={AppRoute.standings} element={<StandingsPage />} />
        <Route path={AppRoute.news} element={<NewsPage />} />
        <Route path={AppRoute.gallery} element={<GalleryPage />} />
        <Route path={AppRoute.contacts} element={<ContactsPage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />

      <Route element={<AdminLayout />}>
        <Route
          path={AppRoute.admin}
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path={`${AppRoute.admin}/:section`}
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
