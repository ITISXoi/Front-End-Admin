import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from 'react-query';
import { getListNFT, getMyNFT, getNFTById, getNFTByIdNFTRequest, getNFTCardOwnedRequest } from './request';
import { INFT, INFTByIdParams, LIMIT_NFT, INFTCardOwnedParams, IListNFT, IListNFTParams } from './types';

export const useListNFT = (params: IListNFTParams, option?: UseQueryOptions<IListNFT, Error>) => {
  return useQuery<IListNFT, Error>(['/nft/list', params], () => getListNFT(params), option);
};

export const useMyNFT = (params: IListNFTParams, option?: UseQueryOptions<IListNFT, Error>) => {
  return useQuery<IListNFT, Error>(['/nft/my', params], () => getMyNFT(params), option);
};

export const useNFTById = (params: number, option?: UseQueryOptions<INFT, Error>) => {
  return useQuery<INFT, Error>(['/nft/byId', params], () => getNFTById(params), option);
};
///////////////////////////
export const useNFT = (params: INFTByIdParams, option?: UseQueryOptions<INFT, Error>) => {
  return useQuery<INFT, Error>(
    `/nft/detail/?id=${params.id}&userId=${params.userId ?? ''}`,
    () => getNFTByIdNFTRequest(params),
    option
  );
};

export const useInfinityNFTOwned = (
  filterParams?: INFTCardOwnedParams,
  option?: UseInfiniteQueryOptions<IListNFT, Error>
) => {
  return useInfiniteQuery<IListNFT, Error>(
    [`/nft/list-of-owner`, filterParams],
    ({ pageParam = 1 }) => {
      const params: INFTCardOwnedParams = { ...filterParams, limit: LIMIT_NFT, page: pageParam };
      return getNFTCardOwnedRequest(params);
    },
    option
  );
};

export const useInfinityListNFT = (
  filterParams?: INFTCardOwnedParams,
  option?: UseInfiniteQueryOptions<IListNFT, Error>
) => {
  return useInfiniteQuery<IListNFT, Error>(
    [`/nft/list-nfts`, filterParams],
    ({ pageParam = 1 }) => {
      const params: IListNFTParams = { ...filterParams, limit: LIMIT_NFT, page: pageParam };
      return getListNFT(params);
    },
    option
  );
};
