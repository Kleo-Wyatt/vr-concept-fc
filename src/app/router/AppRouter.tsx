import { Route, Routes } from 'react-router-dom';

import { AboutPage } from '@pages/about/ui/AboutPage';
import { AdminPage } from '@pages/admin/ui/AdminPage';
import { ContactsPage } from '@pages/contacts/ui/ContactsPage';
import { GalleryPage } from '@pages/gallery/ui/GalleryPage';
import { HomePage } from '@pages/home/ui/HomePage';
import { NewsPage } from '@pages/news/ui/NewsPage';
import { NotFoundPage } from '@pages/not-found/ui/NotFoundPage';
import { SchedulePage } from '@pages/schedule/ui/SchedulePage';
import { StandingsPage } from '@pages/standings/ui/StandingsPage';
import { TeamPage } from '@pages/team/ui/TeamPage';

import { AdminLayout } from '@widgets/admin-layout/ui/AdminLayout';
import { PublicLayout } from '@widgets/public-layout/ui/PublicLayout';

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

      <Route element={<AdminLayout />}>
        <Route path={AppRoute.admin} element={<AdminPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
