import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@app/router/AppRouter';
import { ScrollToTop } from '@shared/ui';

export function AppRouterProvider() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
}
