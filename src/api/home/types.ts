import { IUser } from '../auth';
import { ICollection } from '../collection';
import { INFT } from '../nft';

export type IFeaturedNFT = INFT[];

export type IFeaturedArtwork = {
  id: number;
  preview_image: string;
  origin_image: string;
};

export interface INews {
  url?: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: any;
    categories: string[];
  }[];
}

export interface IFeaturedAuction {
  id: number;
  price: string;
  quantity: number;
  pendingQuantity: number;
  successQuantity: number;
  action: number;
  receiveToken: string;
  status: number;
  rawTransactionId: number;
  orderId: number;
  bidId: number;
  txId: string;
  nftVersionId: null;
  networkTokenId: number;
  createdAt: string;
  expired: number;
  influencer: string;
  influencerFee: number;
  originalPrice: string;
  auctionSessionId: number;
  nft: INFT;
}

export type IHeroSection = {
  id: number;
  nftId: number;
  title: string;
  description: string;
  image: string;
  backgroundImage: string;
  backgroundColor: string;
  transparency: string;
  isBanner: number;
  ctaButtonText: string;
  ctaButtonColor: string;
  ctaButtonUrl: string;
  createdAt: string;
  nft?: INFT;
};
