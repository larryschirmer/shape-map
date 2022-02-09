import * as turfHelpers from '@turf/helpers';
import turfUnion from '@turf/union';

type Feature = {
  polygon: turfHelpers.Position[][];
};

const unionPolygons = (
  features: Feature[],
  selected: number[],
  history: { id: number; description: string; featureIds: number[] }[],
  historyIdx: number,
) => {
  // perform intersect process
  const poly1 = turfHelpers.polygon(features[selected[0]].polygon);
  const poly2 = turfHelpers.polygon(features[selected[1]].polygon);
  const intersectedFeature = turfUnion(poly1, poly2);

  // return original inputs if no intersection exists
  if (intersectedFeature === null)
    return {
      features,
      history,
    };

  // add intersected feature to features array
  let newFeatures: Feature[];
  if (intersectedFeature.geometry.type === 'Polygon') {
    newFeatures = [{ polygon: intersectedFeature.geometry.coordinates }];
  } else {
    newFeatures = intersectedFeature.geometry.coordinates.map((feature) => ({
      polygon: feature,
    }));
  }

  const updatedFeatures: Feature[] = [...features, ...newFeatures];
  // create a new history state
  // - remove intersected parents
  const newHistoryIds = history[historyIdx].featureIds
    .filter((featureId) => !selected.includes(featureId))
    // - add new feature ids
    .concat(new Array(newFeatures.length).fill(null).map((_, idx) => features.length + idx));

  let updatedHistory = history.slice(0);
  const newHistoryIdx = history[0].id + 1;
  updatedHistory.splice(0, historyIdx);

  return {
    features: updatedFeatures,
    history: [
      { id: newHistoryIdx, description: 'Union', featureIds: newHistoryIds },
      ...updatedHistory,
    ],
  };
};

export default unionPolygons;
