import { create } from "zustand";

interface TrackerDataState {
  mainTrackerData: [];
  expenseData: [];
  savingsData: [];
  setMainTrackerData: (trackerData: any) => void;
  setExpenseData: (trackerData: any) => void;
  setSavingsData: (trackerData: any) => void;
}

export const useTrackerDataStore = create<TrackerDataState>()((set) => ({
  mainTrackerData: [],
  expenseData: [],
  savingsData: [],
  setMainTrackerData: (trackerData: any) =>
    set((state: any) => ({ ...state, mainTrackerData: trackerData })),
  setExpenseData: (expenseData: any) =>
    set((state: any) => ({ ...state, expenseData: expenseData })),
  setSavingsData: (savingsData: any) =>
    set((state: any) => ({ ...state, savingsData: savingsData })),
}));
