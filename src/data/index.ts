import polygons1 from './SE_State_Management_Polygons_1.json';
import polygons2 from './SE_State_Management_Polygons_2.json';

type Data = {
  name: string;
  numFeatures: number;
  features: {
    type: string;
    properties: {};
    geometry: {
      type: string;
      coordinates: number[][][];
    };
  }[];
}[];

const data: Data = [
  {
    name: 'Polygons 1',
    numFeatures: polygons1.features.length,
    features: polygons1.features,
  },
  {
    name: 'Polygons 2',
    numFeatures: polygons2.features.length,
    features: polygons2.features,
  },
];

export default data;
