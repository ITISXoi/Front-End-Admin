import { ISortMap, PagedMeta, Paging } from 'types/util.types';
import { IUser } from '../auth';
import { INetworkToken } from '../common';
import { INFT } from '../nft';

export interface ICreateCollectionParams {
  name: string;
  description: string;
  address: string;
  chainId: number;
  paymentToken: string;
  image?: File;
  banner?: File;
  symbol?: string;
  totalNfts: number;
  numberLayers: number;
  startMintTime?: number;
  endMintTime?: number;
  type: string;
  price: string;
}

export interface ICreateLayer {
  collectionId: number;
  name: string;
  description?: string;
  layerIndex: number;
  images: File[];
  imagesDescription: string;
}

export interface ICreateImage {
  collectionId: number;
  layerId: number;
  name: string;
  description?: string;
  image?: string | File;
  quantity: string;
}

export interface ICollection {
  id: number;
  name: string;
  bannerUrl: string;
  imageUrl: string;
  description: string;
  chainId: string;
  collectionId: number;
  address: string;
  owner: string;
  paymentToken: string;
  price: string;
  status: string;
  isPublic: any;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  totalNfts: number;
  numberLayers: number;
  symbol: string;
  nftMinted: number;
  currency: string;
  startMintTime?: number;
  endMintTime?: number;
  type: string;
  isAutoMint: boolean;
  isCreateDraft: boolean;
}

export interface IListCollection {
  items: ICollection[];
  meta: PagedMeta;
}

export interface IImageDescription {
  name: string;
  quantity: number;
  probability: number;
  price: number;
}
export interface ILayerCreate {
  name: string;
  description: string;
  collectionId: number;
  layerIndex: number;
  images: IImageObject[];
}

export interface ILayerPreviewParams {
  collectionId: number;
  layerIndex: number;
}

export interface IImageObject {
  id?: number;
  name: string;
  quantity: number;
  probability: number;
  price: number;
  imageUrl: string | File;
}

export interface ILayer {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  collectionId: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  images: IImageLayer[];
}

export interface IListLayers {
  items: ILayer[];
  meta: PagedMeta;
}

export interface IImageLayer {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  collectionId: number;
  layerId: number;
  quantity: number;
  probability: number;
  price: number;
  layerIndex?: number;
}

export interface IDraftINFT {
  name: string;
  images: any;
  collectionKeyId: string | number;
  collectionName: string;
  description?: string;
  note?: string;
  imageIds: string;
}

export interface IDraftINFTResponse {
  collectionKeyId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  imageType: string;
  note: string;
  properties: string;
  data: string;
  id: string;
  type: string;
  url_ipfs: string;
  signature: string;
}

export interface IUpdateDraftNft {
  id: string;
  formData: FormData;
}

export interface IDraftDetail extends IDraftINFTResponse {
  images: IImageLayer[];
}

export interface IListImageLayerParams extends Paging {
  layerId?: number;
  collectionId?: number;
}

export interface IListImageLayer {
  data: IImageLayer[];
  meta: PagedMeta;
}

//////////////////////////////////////////
export interface IUpdateCollectionParams {
  id: number;
  name?: string;
  description: string;
  image?: string;
  banner?: string;
  networkId?: number;
  totalNfts?: number;
  numberLayers?: number;
}

export interface ICreateImageCollectionParams {
  collectionId: number;
  file: File;
  userId: number;
  imageType: 'banner' | 'logo' | 'card';
}
export interface ICreateCollectionPayload {
  address: string;
  bannerUrl: string;
  chainId: string;
  collectionAddress: string;
  createdAt: string;
  creatorId: number;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  paymentToken: string;
  price: string;
  status: string;
  updatedAt: string;
  totalNfts: number;
  numberLayers: number;
  currency: string;
  type: string;
  startMintTime?: number;
  endMintTime?: number;
}

export interface IFullCollection {
  id: number;
  name: string;
  description: string;
  image?: string;
  banner?: string;
  networkId: number;
  network: {
    id: 1;
    name: string;
    chainId: 4;
    marketContract: string;
    polka1155GeneralContract: string;
    polka721Contract: string;
    referralContract: string;
    polkaUriContract: string;
    auctionContract: string;
    rpc: string;
    image: string;
    gasLimit: number;
    gasLimitCollection: number;
    gasPrice: string;
    status: number;
    createdAt: string;
    networkTokens: INetworkToken[];
  };
  contractAddress?: any;
  rawTransaction?: any;
  hashTransaction?: any;
  status: number;
  type: number;
  user: IUser;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
export interface ICollectionPages {
  page: number;
  limit: number;
  type?: number[];
  status?: number;
  networkId?: number;
  isImport?: boolean;
}

export interface IVolumes {
  floorPrice: string;
  receiveToken: string;
  timesTraded: string;
  volume: string;
}

export interface IListCollectionResponse {
  items: ICollection[];
  meta: PagedMeta;
}

export type INFTByCollectionIdParams = Paging & {
  name?: string;
  categories?: string[];
  searchStatuses?: number[];
  price?: {
    startPrice?: number;
    endPrice?: number;
    currency?: string;
  };
  sort?: number;
  userId?: number;
  networkId?: number;
  networkIds?: number[];
  networkTokenId?: number;
  networkTokenIds?: [];
  standardType?: number;
  collectionId?: number;
};

export interface INFTByCollectionId {
  items: INFT[];
  meta: PagedMeta;
}

export interface IGetPublicCollectionParams extends Paging {
  networkId?: string;
  userId?: number;
  // TODO: WHAT IS THIS?
  status?: number;
  // TODO: WHAT IS THIS?
  type?: number;
}

export type IGetActivitiesSortParams = Partial<ISortMap<'price' | 'artworkName' | 'createdAt'>>;
export interface IGetActivitiesParams extends Paging {
  sort?: IGetActivitiesSortParams;
  collectionId: number;
}

export interface ICollectionActivity {
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
  nftVersionId: any;
  networkTokenId: number;
  createdAt: string;
  expired: number;
  influencer: string;
  influencerFee: number;
  originalPrice: string;
  auctionSessionId: null;
  toUser: IUser;
  fromUser: IUser;
  nft: INFT;
}

export interface ICollectionActivitiesResponse {
  items: ICollectionActivity[];
  meta: PagedMeta;
}

export interface IGetExploreCollectionsParams {
  page?: number;
  limit?: number;
  type?: string[];
  status?: string[];
  userId?: number;
}
