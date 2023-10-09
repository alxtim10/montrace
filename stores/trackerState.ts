import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

export interface TrackerState {
  mainTimelineData: [];
  expenseData: [];
  savingsData: [];
}

const initialState: TrackerState = {
  mainTimelineData: [],
  expenseData: [],
  savingsData: [],
};

export const trackerDataSlice = createSlice({
  name: "trackerDataReducer",
  initialState,
  reducers: {
    setTrackerData: (state, action) => {
      state.mainTimelineData = action.payload.mainTimelineData;
      state.expenseData = action.payload.expenseData;
      state.savingsData = action.payload.savingsData;
    },
  },
});

export const { setTrackerData } = trackerDataSlice.actions;
export const currentMainTimelineData = (state: RootState) =>
  state.trackerContainer.mainTimelineData;
export const currentExpenseData = (state: RootState) =>
  state.trackerContainer.expenseData;
export const currentSavingsData = (state: RootState) =>
  state.trackerContainer.savingsData;

export default trackerDataSlice.reducer;
