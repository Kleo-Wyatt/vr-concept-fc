import { AppErrorBoundary } from '@app/providers/AppErrorBoundary';
import { AppQueryProvider } from '@app/providers/AppQueryProvider';
import { AppRouterProvider } from '@app/providers/AppRouterProvider';

function App() {
  return (
    <AppErrorBoundary>
      <AppQueryProvider>
        <AppRouterProvider />
      </AppQueryProvider>
    </AppErrorBoundary>
  );
}

export default App;
