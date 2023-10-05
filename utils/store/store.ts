import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import trackerSwitch from './trackerSwitch';

export const store = configureStore({
  reducer: {
    trackerField: trackerSwitch,
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
