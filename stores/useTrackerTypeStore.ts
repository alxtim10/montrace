import { create } from "zustand";

interface TrackerTypeState {
  trackerType: string;
  setTrackerType: (type: string) => void;
}

export const useTrackerTypeStore = create<TrackerTypeState>()((set) => ({
  trackerType: "expense",
  setTrackerType: (type: string) =>
    set((state: any) => ({ ...state, trackerType: type })),
}));
