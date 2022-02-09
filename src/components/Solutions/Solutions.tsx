import React from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setSelectedSolution, selectSolutions } from 'app/slices/appData';

import styles from './Solutions.module.scss';

const Solutions = () => {
  const dispatch = useAppDispatch();
  const selectedSolution = useAppSelector(({ appData }) => appData.selectedSolution);
  const solutions = useAppSelector(selectSolutions);

  const handleSelectSolution = (solutionId: number) => {
    dispatch(setSelectedSolution(solutionId));
  };

  const getIsSelected = (featureId: number) => {
    return selectedSolution === featureId;
  };

  const solutionClass = (isSelected: boolean) =>
    classNames(styles['solution'], {
      [styles['selected']]: isSelected,
    });

  return (
    <section className={styles['solutions']}>
      <ul>
        {solutions.map(({ id, name }) => (
          <li key={id}>
            <button
              className={solutionClass(getIsSelected(id))}
              onClick={() => handleSelectSolution(id)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Solutions;
