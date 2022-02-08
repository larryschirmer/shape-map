import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import data from 'data';

type Solution = {
  id: number;
  name: string;
  features: {
    polygon: number[][][];
  }[];
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
      state.data = data.map(({ id, name, features }) => ({
        id,
        name,
        features: features.map(({ geometry }) => ({
          polygon: geometry.coordinates,
        })),
      }));
    },
    selectSolution: (state, action: PayloadAction<number>) => {
      state.selectedSolution = action.payload;
    },
  },
});

export default appDataSlice.reducer;

export const { loadData, selectSolution } = appDataSlice.actions;
