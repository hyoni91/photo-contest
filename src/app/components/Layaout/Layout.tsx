import React, { ReactNode } from 'react';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        Photo Contest
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        &copy; 2025 Photo Contest. All rights reserved.
      </footer>
    </div>
  );
}
