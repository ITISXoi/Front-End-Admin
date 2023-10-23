import CollectionJSON from 'contracts/collection.json';
import { Collection } from 'contracts/types';
import { useContract } from './useContract';

export function useCollectionContract(address: string) {
  return useContract<Collection>(address, CollectionJSON);
}
