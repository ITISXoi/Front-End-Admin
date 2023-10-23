import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { MEDIUM_URL } from 'utils/constants';
import { ICollection } from '../collection';
import { INFT } from '../nft';
import {
  getFeaturedArtwork,
  getFeaturedAuctionRequest,
  getFeaturedCollectionRequest,
  getFeaturedNFTRequest,
  getHeroSection,
} from './request';
import { IFeaturedNFT, IHeroSection, INews } from './types';

export const useFeaturedNFT = (option?: UseQueryOptions<IFeaturedNFT, Error>) => {
  return useQuery<IFeaturedNFT, Error>('/nfts/homepage', getFeaturedNFTRequest, option);
};

export const useFeaturedAuction = (option?: UseQueryOptions<INFT[], Error>) => {
  return useQuery<INFT[], Error>('/nfts/homepage-auction', getFeaturedAuctionRequest, option);
};

export const useFeaturedCollection = (option?: UseQueryOptions<ICollection[], Error>) => {
  return useQuery<ICollection[], Error>('/collections/homepage', getFeaturedCollectionRequest, option);
};

export const useFeaturedArtwork = (option?: UseQueryOptions<INFT[], Error>) => {
  return useQuery<INFT[], Error>('/nfts/homepage-artworks', getFeaturedArtwork, option);
};

export const useLastedNews = (option?: UseQueryOptions<INews, Error>) => {
  return useQuery<INews, Error>(
    MEDIUM_URL,
    async () => {
      const { data } = await axios.get(MEDIUM_URL);
      return data as any;
    },
    option
  );
};

export const useHeroSection = (option?: UseQueryOptions<IHeroSection, Error>) => {
  return useQuery<IHeroSection, Error>('/banner/banner', getHeroSection, {
    ...option,
    retry: false,
    retryOnMount: false,
  });
};
