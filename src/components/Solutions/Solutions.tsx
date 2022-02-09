import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setSelectedSolution, selectSolutions } from 'app/slices/appData';

import styles from './Solutions.module.scss';

const Solutions = () => {
  const dispatch = useAppDispatch();
  const solutions = useAppSelector(selectSolutions);

  const handleSelectSolution = (solutionId: number) => {
    dispatch(setSelectedSolution(solutionId));
  };

  return (
    <section className={styles['solutions']}>
      <ul>
        {solutions.map(({ id, name }) => (
          <li key={id}>
            <button onClick={() => handleSelectSolution(id)}>{name}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Solutions;
