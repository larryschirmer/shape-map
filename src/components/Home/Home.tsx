import React, { useEffect } from 'react';

import { useAppDispatch } from 'app/hooks';
import { loadData } from 'app/slices/appData';

import Solutions from 'components/Solutions';
import WorkSurface from 'components/WorkSurface';
import StatsTools from 'components/StatsTools';

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
      <WorkSurface />
      <StatsTools />
    </div>
  );
};

export default Home;
