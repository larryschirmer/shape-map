import * as turfHelpers from '@turf/helpers';
import turfIntersect from '@turf/intersect';

type Feature = {
  polygon: turfHelpers.Position[][];
};

const intersectPolygons = (features: Feature[], selected: number[], history: number[][]) => {
  // perform intersect process
  const poly1 = turfHelpers.polygon(features[selected[0]].polygon);
  const poly2 = turfHelpers.polygon(features[selected[1]].polygon);
  const intersectedFeature = turfIntersect(poly1, poly2);

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
  let newHistory = history[0]
    .filter((featureId) => !selected.includes(featureId))
    // - add new feature ids
    .concat(new Array(newFeatures.length).fill(null).map((_, idx) => features.length + idx));

  return {
    features: updatedFeatures,
    history: [newHistory, ...history]
  };
};

export default intersectPolygons;
