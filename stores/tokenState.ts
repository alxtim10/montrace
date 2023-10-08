import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export interface TokenState {
  accessToken: string;
  name: string;
  expireTime: string;
}

const initialState: TokenState = {
  accessToken: '',
  name: '',
  expireTime: '',
};

export const tokenSlice = createSlice({
  name: 'tokenContainer',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.token;
      state.name = action.payload.name;
      state.expireTime = action.payload.exp;
    }
  },
});

export const { setToken } = tokenSlice.actions;
export const currentAccessToken = (state: RootState) => state.tokenField.accessToken;
export const currentExpireTime = (state: RootState) => state.tokenField.expireTime;
export const currentName = (state: RootState) => state.tokenField.name;

export default tokenSlice.reducer;
