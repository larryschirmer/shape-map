import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import geoData from 'data';

type Solution = {
  id: number;
  name: string;
  features: {
    polygon: number[][][];
  }[];
  history: number[][];
  selected: number[];
};

type AppData = {
  data: Solution[];
  selectedSolution: number | null; // solution id
};

const initialState: AppData = {
  data: [],
  selectedSolution: null,
};

export const appDataSlice = createSlice({
  name: 'addData',
  initialState,
  reducers: {
    loadData: (state) => {
      state.data = geoData.map(({ id, name, features }) => ({
        id,
        name,
        features: features.map(({ geometry }) => ({
          polygon: geometry.coordinates,
        })),
        history: [[...new Array(features.length).fill(null).map((_, idx) => idx)]],
        selected: [],
      }));
    },
    setSelectedSolution: (state, action: PayloadAction<number>) => {
      state.selectedSolution = action.payload;
    },
    toggleFeature: (state, action: PayloadAction<number>) => {
      if (state.selectedSolution === null) return state;

      let selectedFeatures = [...state.data[state.selectedSolution].selected];
      if (selectedFeatures.includes(action.payload))
        selectedFeatures.splice(selectedFeatures.indexOf(action.payload), 1);
      else selectedFeatures.push(action.payload);

      return {
        ...state,
        data: state.data.map((solution) => {
          if (solution.id === state.selectedSolution) {
            return {
              ...solution,
              selected: selectedFeatures,
            };
          } else {
            return solution;
          }
        }),
      };
    },
  },
});

export default appDataSlice.reducer;

export const selectSolutions = ({ appData }: RootState) =>
  appData.data.map(({ id, name }) => ({ id, name }));

export const selectSolution = ({ appData }: RootState) => {
  if (appData.selectedSolution === null) return null;
  return appData.data[appData.selectedSolution];
};

export const selectFeatures = ({ appData }: RootState) => {
  if (appData.selectedSolution === null) return null;
  const { selected, features } = appData.data[appData.selectedSolution];
  return selected
    .slice(0)
    .sort((a, b) => a - b)
    .map((featureId) => ({
      featureId,
      ...features[featureId],
    }));
};

export const { loadData, setSelectedSolution, toggleFeature } = appDataSlice.actions;
