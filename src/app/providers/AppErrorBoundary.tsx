import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

import styles from './AppErrorBoundary.module.css';

type AppErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class AppErrorBoundary extends Component<
  PropsWithChildren,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('AppErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.icon}>⚠️</div>

          <h1 className={styles.title}>Что-то пошло не так</h1>

          <p className={styles.description}>
            На странице произошла ошибка. Попробуйте обновить сайт или вернуться
            на главную.
          </p>

          {import.meta.env.DEV && this.state.error && (
            <pre className={styles.error}>{this.state.error.message}</pre>
          )}

          <div className={styles.actions}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={this.handleReload}
            >
              Обновить страницу
            </button>

            <button
              className={styles.secondaryButton}
              type="button"
              onClick={this.handleGoHome}
            >
              На главную
            </button>
          </div>
        </section>
      </main>
    );
  }
}
