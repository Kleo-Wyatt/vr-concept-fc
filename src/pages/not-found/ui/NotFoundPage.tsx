import { Link } from 'react-router-dom';

import { Button, Card } from '@shared/ui';
import { AppRoute } from '@shared/config/routes';

export function NotFoundPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '64px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <Card>
          <h1>404 — страница не найдена</h1>
          <p>К сожалению, запрошенная страница не существует.</p>

          <Button as={Link} to={AppRoute.home}>
            Вернуться на главную
          </Button>
        </Card>
      </div>
    </main>
  );
}