import { type FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { Button, Card } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api/http';

import { loginAdmin } from '../../model/authApi';
import { isAuthenticated, setAuthToken } from '../../model/authToken';

import styles from './LoginPage.module.css';

type LocationState = {
  from?: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState | null;
  const redirectTo = locationState?.from ?? '/admin';

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {
      const response = await loginAdmin({
        login,
        password,
      });

      setAuthToken(response.token);

      navigate(redirectTo, {
        replace: true,
      });
    } catch (submitError) {
      setError(getApiErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <Card className={styles.card}>
        <div className={styles.badge}>VR CONCEPT FC</div>

        <p className={styles.description}>
          Введите логин и пароль администратора.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Логин</span>
            <input
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Пароль</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Входим...' : 'Войти'}
          </Button>
        </form>
      </Card>
    </main>
  );
}
