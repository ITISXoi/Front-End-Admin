import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IWalletStore {
  openWallet: boolean;
  openWrongNetwork: boolean;
  openAccount: boolean;
}

const initialState: IWalletStore = {
  openWallet: false,
  openWrongNetwork: false,
  openAccount: false,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    toggleWalletModal: (state) => {
      return {
        ...state,
        openWallet: !state.openWallet,
      };
    },
    toggleWrongNetwork: (state) => {
      return {
        ...state,
        openWrongNetwork: !state.openWrongNetwork,
      };
    },
    toggleAccountModal: (state) => {
      return {
        ...state,
        openAccount: !state.openAccount,
      };
    },
  },
});

export const { toggleWalletModal, toggleWrongNetwork, toggleAccountModal } =
  walletSlice.actions;

export const getWalletModal = (state: RootState) => state.wallet.openWallet;
export const getWrongNetworkModal = (state: RootState) =>
  state.wallet.openWrongNetwork;
export const getAccountModal = (state: RootState) => state.wallet.openAccount;

export default walletSlice.reducer;
