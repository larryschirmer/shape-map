import * as turfHelpers from '@turf/helpers';
import turfUnion from '@turf/union';
import turfArea from '@turf/area';

type Feature = {
  featureId: number;
  polygon: turfHelpers.Position[][];
};

const polygonAreaSum = (polygonOne: Feature, polygonTwo: Feature) => {
  const poly1 = turfHelpers.polygon(polygonOne.polygon);
  const poly2 = turfHelpers.polygon(polygonTwo.polygon);
  const unionFeature = turfUnion(poly1, poly2);
  let area: number = 0;

  if (unionFeature?.geometry.type === 'Polygon') {
    area = turfArea(unionFeature);
  } else {
    const areas =
      unionFeature?.geometry.coordinates.map((feature) => turfArea(turfHelpers.polygon(feature))) ||
      [];
    area = areas.reduce((sum, val) => sum + val, 0);
  }

  return area.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

export default polygonAreaSum;
