import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setSelectedSolution, selectSolutions } from 'app/slices/appData';

import ListButton from 'components/ListButton';

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

  return (
    <section className={styles['solutions']}>
      <ul>
        {solutions.map(({ id, name }) => (
          <li key={id}>
            <ListButton
              isActive={getIsSelected(id)}
              onClick={() => handleSelectSolution(id)}>
              {name}
            </ListButton>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Solutions;
