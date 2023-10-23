import { PagedMeta, Paging } from 'types/util.types';
import { IFullCollection } from '../collection';
import { ICategory, INetwork } from '../common';

export type INFTCardOwnedParams = Paging & {
  name?: string;
};

export interface IListNFTParams extends Paging {
  contractAddress?: string;
  collectionId?: string;
  chainId?: string;
  name?: string;
}

export interface INFT {
  id: string;
  chainId?: string;
  contractAddress?: string;
  tokenId?: string;
  tokenImg: number;
  collectionId?: number;
  layerIds?: string;
  imagesIds?: string;
  collectionName?: string;
  name?: string;
  slug?: string;
  price?: string;
  contractPrice?: string;
  imageUrl?: string;
  description?: string;
  note?: string;
  tokenUri?: string;
  data?: string;
  metaData?: string;
  file?: string;
  attributes: string;
  imageType?: string;
  blockTimestamp?: string;
  status?: string;
  owner?: string;
  artistId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IImageAttributes {
  imageDescription?: string; 
  imageName?: string;
  imagePercent?: string;
  imagePrice?: string
  imageProbability?: string;
  imageQuantity?: number;
  imageRemainingQuantity?: number;
  layerName?: string;
}

export interface IListNFT {
  items: INFT[];
  meta: PagedMeta;
}

export interface ICreateNFTParams {
  name?: string;
  description?: string;
  unlockableContent?: string;
  categoryIds?: number[];
  noCopy?: number;
  royalty?: number;
  quantity?: number;
  price?: number;
  market?: number;
  collectionId?: number;
  networkId?: number;
  receiveToken?: string;
  hashtag?: string[];
  properties?: string;
  bannerColor?: string;
}

export interface ICreateImageNFTParams {
  nftId: number;
  file: File;
  userId: number;
  uploadUrl?: string;
  previewImgId?: string;
  type?: string;
}

export interface IPresignedResponse {
  upload_url?: string;
  path?: string;
}
export interface ICreateNFTPayload {
  user: {
    id: number;
  };
  name: string;
  description: string;
  category: ICategory[];
  collections: IFullCollection;
  network: INetwork;
  royalty: number;
  unlockableContent: string;
  receiveToken?: any;
  platformCommission: string;
  noCopy: number;
  quantity: number;
  price?: any;
  market: number;
  type: number;
  collectionsId: number;
  networkId: number;
  originImage?: any;
  smallImage?: any;
  largeImage?: any;
  ipfsJson?: any;
  rawTransaction?: any;
  hashTransaction?: any;
  tokenId?: any;
  minted: number;
  pumpkin: number;
  fileExtension?: any;
  previewImage?: any;
  fullImage?: any;
  id: number;
  status: number;
  onFarmStatus: number;
  onSaleStatus: number;
  standardType: number;
  isFeature: number;
  createdAt: string;
  updatedAt: string;
  minStartPrice: string;
  hashtag: string[];
}

export interface ISignCreateNftSocket {
  data: {
    dataReturn: {
      signData: {
        from: string;
        to?: string;
        data: string;
        gas: number;
        gasPrice: number;
        nonce: number;
        networkId: number;
      };
    };
    address: string;
    nonce: number;
    nftId: number;
    type: number;
  };
}

export interface IExternalCreateNftSota721Success {
  data: {
    nft: {
      id: number;
      type: number;
      pumpkin: number;
      userId: number;
      price?: any;
      quantity: number;
      receiveToken?: string;
      no_copy: number;
      networkId: number;
    };
    txHash: string;
    result: boolean;
    saleData?: any;
    address: string;
  };
}

export interface INFTByIdParams {
  id: any;
  userId?: any;
}

export interface INFTsOwned {
  items: INFT[];
  meta: {
    itemCount: number;
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}

export type INFTHistoryParams = Paging & {
  nftId?: number;
};
export type INFTByCollectionParams = Paging & {
  nftsId?: number;
  userId?: number;
};

export interface ITag {
  id: number;
  name: string;
}

export const LIMIT_GALLERY = 16;

export const LIMIT_NFT = 4;
