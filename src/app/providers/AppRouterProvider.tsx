import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@app/router/AppRouter';

export function AppRouterProvider() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
