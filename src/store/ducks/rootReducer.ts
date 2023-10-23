import { combineReducers } from '@reduxjs/toolkit';
import collection from './collection/slice';
import system from './system/slice';
import wallet from './wallet/slice';

const createRootReducer = () => {
  return combineReducers({
    wallet,
    system,
    collection,
  });
};

export default createRootReducer;
