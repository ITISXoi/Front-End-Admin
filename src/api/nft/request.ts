import { request } from 'api/axios';
import { IListNFT, IListNFTParams, INFT, INFTByCollectionParams, INFTByIdParams, INFTCardOwnedParams } from './types';

export const getNFTByIdNFTRequest = async (params: INFTByIdParams): Promise<INFT> => {
  const { data } = await request({
    url: `/nft/detail/${params.id}`,
    method: 'GET',
  });
  return data as any;
};

export const getNFTCardOwnedRequest = async (params: INFTCardOwnedParams): Promise<IListNFT> => {
  const res: any = await request({
    url: `/nft/list-of-owner`,
    method: 'GET',
    params: params,
  });

  return {
    items: res.data,
    meta: res?.meta?.pagination,
  };
};

export const getListNFT = async (params: IListNFTParams): Promise<IListNFT> => {
  const res: any = await request({
    url: `/nft-admin/list-nft`,
    method: 'GET',
    params: params,
  });

  return {
    items: res?.data,
    meta: res?.meta?.pagination,
  };
};

export const getMyNFT = async (params: IListNFTParams): Promise<IListNFT> => {
  const res: any = await request({
    url: `/nft-admin/list-my-nft`,
    method: 'GET',
    params: params,
  });

  return {
    items: res?.data,
    meta: res?.meta?.pagination,
  };
};

export const getNFTById = async (params: number): Promise<INFT> => {
  const res: any = await request({
    url: `/nft-admin/${params}`,
    method: 'GET',
  });

  return res?.data
};

export const getNFTByCollections = async (params: INFTByCollectionParams): Promise<INFT[]> => {
  const { data } = await request({
    url: `/nfts/from-this-collection`,
    method: 'get',
    params: params,
  });
  return data as any;
};

export const syncNFTMetaRequest = async (params: INFTByCollectionParams): Promise<any> => {
  const { data } = await request({
    url: `/nfts/sync-metadata-nft`,
    method: 'post',
    data: params,
  });
  return data as any;
};
