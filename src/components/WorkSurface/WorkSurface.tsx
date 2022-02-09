import React from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSolution, toggleFeature } from 'app/slices/appData';

import styles from './WorkSurface.module.scss';

const WorkSurface = () => {
  const dispatch = useAppDispatch();
  const solution = useAppSelector(selectSolution);

  const handleToggleFeature = (featureId: number) => {
    dispatch(toggleFeature(featureId));
  };

  const featureToggleClass = (isSelected: boolean) =>
    classNames(styles['feature-toggle'], {
      [styles['selected']]: isSelected,
    });

  const getIsSelected = (featureId: number) => {
    return solution?.selected.includes(featureId) ?? false;
  };

  return (
    <section className={styles['work-surface']}>
      {solution !== null &&
        solution.history[solution.historyIdx].featureIds.map((featureId) => (
          <button
            key={featureId}
            onClick={() => handleToggleFeature(featureId)}
            className={featureToggleClass(getIsSelected(featureId))}
          >
            {featureId}
          </button>
        ))}
    </section>
  );
};

export default WorkSurface;
