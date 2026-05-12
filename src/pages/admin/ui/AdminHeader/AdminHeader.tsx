import { Link } from 'react-router-dom';

import { AppRoute } from '@shared/config/routes';
import { Button } from '@shared/ui';

import styles from './AdminHeader.module.css';

type AdminHeaderProps = {
  onLogout: () => void;
};

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <h1>Админ-панель</h1>
        <p>Управление данными сайта VR CONCEPT FC</p>
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onLogout}>
          Выйти
        </Button>

        <Button as={Link} to={AppRoute.home} variant="secondary">
          Вернуться на сайт
        </Button>
      </div>
    </header>
  );
}
