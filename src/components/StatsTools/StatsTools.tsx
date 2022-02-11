import React from 'react';
import turfArea from '@turf/area';
import * as turfHelpers from '@turf/helpers';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  selectFeatures,
  selectHistory,
  intersectFeatures,
  unionFeatures,
  undoAction,
  redoAction,
  jumpToAction,
} from 'app/slices/appData';

import ListButton from 'components/ListButton';

import styles from './StatsTools.module.scss';

const StatsTools = () => {
  const dispatch = useAppDispatch();
  const features = useAppSelector(selectFeatures) ?? [];
  const { history = [], historyIdx = 0 } = useAppSelector(selectHistory) ?? {};

  const handleUndo = () => {
    dispatch(undoAction());
  };

  const handleRedo = () => {
    dispatch(redoAction());
  };

  const handleJumpToAction = (newHistoryIdx: number) => {
    dispatch(jumpToAction(newHistoryIdx))
  }

  const handleIntersect = () => {
    if (features.length !== 2) return;
    dispatch(intersectFeatures());
  };

  const handleUnion = () => {
    if (features.length !== 2) return;
    dispatch(unionFeatures());
  };

  const isSelected = (operationId: number) => {
    return operationId === historyIdx
  }

  return (
    <section className={styles['stats-tools']}>
      <div className={styles['stats']}>
        {features.map(({ featureId, polygon }) => (
          <div key={featureId} className={styles['feature-area']}>
            <strong>{featureId}</strong>{' '}
            {turfArea(turfHelpers.polygon(polygon)).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            m<sup>2</sup>
          </div>
        ))}
      </div>
      <div className={styles['tools']}>
        <div className={styles['user-actions']}>
          <button disabled={historyIdx >= history.length - 1} onClick={handleUndo}>
            undo
          </button>
          <button disabled={historyIdx <= 0} onClick={handleRedo}>
            redo
          </button>
          <button disabled={features.length !== 2} onClick={handleIntersect}>
            intersect
          </button>
          <button disabled={features.length !== 2} onClick={handleUnion}>
            union
          </button>
        </div>
        <div className={styles['operations']}>
          <h5>History</h5>
          <ul>
            {history.map(({ id, description }, idx) => (
              <li key={id}>
                <ListButton onClick={() => handleJumpToAction(idx)} isActive={isSelected(idx)}>
                  {description}
                </ListButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StatsTools;
