import { request } from 'api/axios';
import { ICollection } from '../collection';
import { INFT } from '../nft';
import { IFeaturedNFT, IHeroSection } from './types';

export const getFeaturedNFTRequest = async (): Promise<IFeaturedNFT> => {
  const { data } = await request({
    url: `/nfts/homepage?limit=12&page=1`,
    method: 'GET',
  });
  return data as any;
};

export const getFeaturedAuctionRequest = async (): Promise<INFT[]> => {
  const { data } = await request({
    url: `/nfts/homepage-auction?limit=12&page=1`,
    method: 'GET',
  });
  return data as any;
};

export const getFeaturedCollectionRequest = async (): Promise<ICollection[]> => {
  const { data } = await request({
    url: `/collections/homepage`,
    method: 'GET',
  });
  return data as any;
};

export const getFeaturedArtwork = async (): Promise<INFT[]> => {
  const { data } = await request({
    url: `/nfts/homepage-artworks?limit=12`,
    method: 'GET',
  });
  return data as any;
};

export const getHeroSection = async (): Promise<IHeroSection> => {
  const { data } = await request({
    url: `/banner/banner`,
    method: 'GET',
  });
  return data as any;
};
