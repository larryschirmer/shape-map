import polygons1 from './SE_State_Management_Polygons_1.json';
import polygons2 from './SE_State_Management_Polygons_2.json';

export type GEOFeature = {
  id: number;
  name: string;
  features: {
    type: string;
    properties: {};
    geometry: {
      type: string;
      coordinates: number[][][];
    };
  }[];
};

const data: GEOFeature[] = [
  {
    id: 0,
    name: 'Polygons 1',
    features: polygons1.features,
  },
  {
    id: 1,
    name: 'Polygons 2',
    features: polygons2.features,
  },
];

export default data;
