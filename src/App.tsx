import { AppQueryProvider } from '@app/providers/AppQueryProvider';
import { AppRouterProvider } from '@app/providers/AppRouterProvider';

function App() {
  return (
    <AppQueryProvider>
      <AppRouterProvider />
    </AppQueryProvider>
  );
}

export default App;
