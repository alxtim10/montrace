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
  reducers: {
    switcher: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { switcher } = trackerSlice.actions;
export const currentTracker = (state: RootState) => state.trackerField.value;
export default trackerSlice.reducer;
