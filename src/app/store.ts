import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'components/Counter/counterSlice';
import appDataReducer from 'app/slices/appData';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appData: appDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
