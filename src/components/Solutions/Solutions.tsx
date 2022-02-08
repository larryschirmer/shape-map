import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSolution } from 'app/slices/appData';

import styles from './Solutions.module.scss';

const Solutions = () => {
  const { data } = useAppSelector(({ appData }) => ({
    data: appData.data,
  }));

  return (
    <section className={styles['solutions']}>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>
            <button>{name}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Solutions;
