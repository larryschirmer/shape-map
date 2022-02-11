import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as turfHelpers from '@turf/helpers';

import { RootState } from 'app/store';
import geoData from 'data';
import { intersectPolygons, unionPolygons } from 'app/utils';

type Solution = {
  id: number;
  name: string;
  features: {
    polygon: turfHelpers.Position[][];
  }[];
  history: { id: number; description: string; featureIds: number[] }[];
  historyIdx: number;
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
        history: [
          {
            id: 0,
            description: 'Original State',
            featureIds: [...new Array(features.length).fill(null).map((_, idx) => idx)],
          },
        ],
        historyIdx: 0,
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
      else {
        // at most 2 features can be selected at a time
        if (selectedFeatures.length >= 2) return state;
        selectedFeatures.push(action.payload);
      }

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
    intersectFeatures: (state) => {
      if (state.selectedSolution === null) return state;
      const { features, selected, history, historyIdx } = state.data[state.selectedSolution];
      if (selected.length !== 2) return state;

      const { features: updatedFeatures, history: updatedHistory } = intersectPolygons(
        features,
        selected,
        history,
        historyIdx,
      );

      // return state
      return {
        ...state,
        data: state.data.map((solution) => {
          if (solution.id === state.selectedSolution) {
            return {
              ...solution,
              features: updatedFeatures,
              history: updatedHistory,
              historyIdx: 0,
              selected: [],
            };
          } else {
            return solution;
          }
        }),
      };
    },
    unionFeatures: (state) => {
      if (state.selectedSolution === null) return state;
      const { features, selected, history, historyIdx } = state.data[state.selectedSolution];
      if (selected.length !== 2) return state;

      const { features: updatedFeatures, history: updatedHistory } = unionPolygons(
        features,
        selected,
        history,
        historyIdx,
      );

      // return state
      return {
        ...state,
        data: state.data.map((solution) => {
          if (solution.id === state.selectedSolution) {
            return {
              ...solution,
              features: updatedFeatures,
              history: updatedHistory,
              historyIdx: 0,
              selected: [],
            };
          } else {
            return solution;
          }
        }),
      };
    },
    undoAction: (state) => {
      if (state.selectedSolution === null) return state;
      const { history, historyIdx } = state.data[state.selectedSolution];
      if (historyIdx >= history.length - 1) return state;

      return {
        ...state,
        data: state.data.map((solution) => {
          if (solution.id === state.selectedSolution) {
            return {
              ...solution,
              historyIdx: historyIdx + 1,
              selected: [],
            };
          } else {
            return solution;
          }
        }),
      };
    },
    redoAction: (state) => {
      if (state.selectedSolution === null) return state;
      const { historyIdx } = state.data[state.selectedSolution];
      if (historyIdx <= 0) return state;

      return {
        ...state,
        data: state.data.map((solution) => {
          if (solution.id === state.selectedSolution) {
            return {
              ...solution,
              historyIdx: historyIdx - 1,
              selected: [],
            };
          } else {
            return solution;
          }
        }),
      };
    },
    jumpToAction: (state, action: PayloadAction<number>) => {
      if (state.selectedSolution === null) return state;
      const { history } = state.data[state.selectedSolution];
      if (action.payload < 0 || action.payload >= history.length) return state;

      return {
        ...state,
        data: state.data.map((solution) => {
          if (solution.id === state.selectedSolution) {
            return {
              ...solution,
              historyIdx: action.payload,
              selected: [],
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

export const selectHistory = ({ appData }: RootState) => {
  if (appData.selectedSolution === null) return null;
  const { historyIdx, history } = appData.data[appData.selectedSolution];
  return { historyIdx, history };
};

export const {
  loadData,
  setSelectedSolution,
  toggleFeature,
  intersectFeatures,
  unionFeatures,
  undoAction,
  redoAction,
  jumpToAction,
} = appDataSlice.actions;
