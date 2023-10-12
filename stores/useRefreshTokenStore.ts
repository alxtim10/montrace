import {create} from "zustand";

interface RefreshTokenState {
  refreshToken: string;
  setRefreshToken: (token: string) => void;
}

export const useRefreshTokenStore = create<RefreshTokenState>()((set) => ({
  refreshToken: "",
  setRefreshToken: (token: string) =>
    set((state: any) => ({ ...state, refreshToken: token })),
}));
