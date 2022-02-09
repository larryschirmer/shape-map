import * as turfHelpers from '@turf/helpers';

type Feature = {
  polygon: turfHelpers.Position[][];
};

const purgeFeatures = (
  features: Feature[],
  history: { id: number; description: string; featureIds: number[] }[],
) => {
  let usedFeatures = new Set<number>();
  history.forEach(({ featureIds }) => {
    for (let featureId of featureIds) {
      usedFeatures.add(featureId);
    }
  });

  return features.map((feature, idx) => {
    if (usedFeatures.has(idx)) return feature;
    else return null;
  });
};

export default purgeFeatures;
