import React from 'react';
import turfArea from '@turf/area';
import * as turfHelpers from '@turf/helpers';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectFeatures } from 'app/slices/appData';

import styles from './StatsTools.module.scss';

const StatsTools = () => {
  const features = useAppSelector(selectFeatures) ?? [];

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
  );
};

export default StatsTools;
