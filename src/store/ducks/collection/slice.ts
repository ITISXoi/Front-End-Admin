import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface ILayerStore {
  name: string;
}

const initialState: {
  collectionId: number;
  layerQuantity: number;
  totalNFT: number;
  currency: string;
  type: string;
  layers: ILayerStore[];
} = {
  collectionId: 0,
  layerQuantity: 0,
  totalNFT: 0,
  currency: '',
  type: '',
  layers: [{ name: 'alo1' }, { name: 'alo2' }, { name: 'alo3' }],
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setLayers: (state, actions: PayloadAction<ILayerStore[]>) => {
      return {
        ...state,
        layers: actions.payload,
      };
    },
    setLayerQuantity: (state, actions: PayloadAction<number>) => {
      return {
        ...state,
        layerQuantity: actions.payload,
      };
    },
    setTotalNFT: (state, actions: PayloadAction<number>) => {
      return {
        ...state,
        totalNFT: actions.payload,
      };
    },
    setCollectionId: (state, actions: PayloadAction<number>) => {
      return {
        ...state,
        collectionId: actions.payload,
      };
    },
    setCurrency: (state, actions: PayloadAction<string>) => {
      return {
        ...state,
        currency: actions.payload,
      };
    },
    setType: (state, actions: PayloadAction<string>) => {
      return {
        ...state,
        type: actions.payload,
      };
    },
  },
});

export const getLayers = (state: RootState) => state.collection.layers;
export const getLayerQuantity = (state: RootState) => state.collection.layerQuantity;
export const getTotalNFT = (state: RootState) => state.collection.totalNFT;
export const getCollectionId = (state: RootState) => state.collection.collectionId;
export const getCurrency = (state: RootState) => state.collection.currency;
export const getType = (state: RootState) => state.collection.type;

export const { setLayers, setLayerQuantity, setTotalNFT, setCollectionId, setCurrency, setType } =
  collectionSlice.actions;

export default collectionSlice.reducer;
