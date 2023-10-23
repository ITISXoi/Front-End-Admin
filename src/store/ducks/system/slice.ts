import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IWalletStore {
  theme: 'light' | 'dark';
  logoutTrigger: boolean;
}

const initialState: IWalletStore = {
  theme: 'light',
  logoutTrigger: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    },
    triggerLogout: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        logoutTrigger: action.payload,
      };
    },
  },
});

export const { toggleTheme, triggerLogout } = systemSlice.actions;

export const getTheme = (state: RootState) => state.system.theme;

export const getLogoutTrigger = (state: RootState) => state.system.logoutTrigger;

export default systemSlice.reducer;
