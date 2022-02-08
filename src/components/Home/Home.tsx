import React, { useEffect } from 'react';

import { useAppDispatch } from 'app/hooks';
import { loadData } from 'app/slices/appData';

import Solutions from 'components/Solutions';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  // load data
  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <div className={styles['home']}>
      <header className={styles['header']}>
        <h1 className={styles['logo']}>S</h1>
      </header>
      <Solutions />
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
