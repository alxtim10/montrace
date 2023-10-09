import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export interface TokenState {
  accessToken: string;
  userId: Number;
  expireTime: string;
}

const initialState: TokenState = {
  accessToken: '',
  userId: 0,
  expireTime: '',
};

export const tokenSlice = createSlice({
  name: 'tokenContainer',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.token;
      state.userId = action.payload.userId;
      state.expireTime = action.payload.exp;
    }
  },
});

export const { setToken } = tokenSlice.actions;
export const currentAccessToken = (state: RootState) => state.tokenField.accessToken;
export const currentExpireTime = (state: RootState) => state.tokenField.expireTime;
export const currentUserId = (state: RootState) => state.tokenField.userId;

export default tokenSlice.reducer;
