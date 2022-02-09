import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSolution } from 'app/slices/appData';

import styles from './Solutions.module.scss';

const Solutions = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(({ appData }) => ({
    data: appData.data,
  }));

  const handleSelectSolution = (solutionId: number) => {
    dispatch(selectSolution(solutionId));
  };

  return (
    <section className={styles['solutions']}>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>
            <button onClick={() => handleSelectSolution(id)}>{name}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Solutions;
