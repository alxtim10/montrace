import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import trackerSwitch from './trackerSwitch';
import tokenState from './tokenState';

export const store = configureStore({
  reducer: {
    trackerField: trackerSwitch,
    tokenField: tokenState,
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
