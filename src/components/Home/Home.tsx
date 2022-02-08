import React from 'react';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles['home']}>
      <header className={styles['header']}>
        <h1 className={styles['logo']}>S</h1>
      </header>
      <section className={styles['solutions']}>
        <ul>
          <li>Proposed Solution</li>
          <li>Proposed Solution</li>
        </ul>
      </section>
      <section className={styles['work-surface']}></section>
      <section className={styles['stats-tools']}>
        <div className={styles['stats']}>123m</div>
        <div className={styles['tools']}>
          <div className={styles['user-actions']}>
            <button>undo</button>
            <button>redo</button>
            <button>intersect</button>
            <button>union</button>
          </div>
          <div className={styles['operations']}>
            <ul>
              <li>Original State</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
