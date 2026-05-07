import { Outlet } from 'react-router-dom';

import { Footer } from '@widgets/footer/ui/Footer';
import { Header } from '@widgets/header/ui/Header';

import styles from './PublicLayout.module.css';

export function PublicLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
