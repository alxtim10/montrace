import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export interface TrackerState {
  value: string;
}

const initialState: TrackerState = {
  value: 'Expense',
};

export const trackerSlice = createSlice({
  name: 'switch',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    switcher: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    }
  },
});

export const { switcher } = trackerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const currentTracker = (state: RootState) => state.trackerField.value;

export default trackerSlice.reducer;
