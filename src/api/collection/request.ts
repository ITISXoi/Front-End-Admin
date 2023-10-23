import { request } from 'api/axios';
import { IListNFT } from 'api/nft';
import {
  ICollection,
  ICreateCollectionPayload,
  ICreateImage,
  IDraftDetail,
  IDraftINFTResponse,
  IGetActivitiesParams,
  IGetExploreCollectionsParams,
  IGetPublicCollectionParams,
  ILayerCreate,
  ILayerPreviewParams,
  IListCollection,
  IListImageLayer,
  IListImageLayerParams,
  IListLayers,
  INFTByCollectionId,
  INFTByCollectionIdParams,
  IUpdateDraftNft,
} from './types';

export const createCollectionRequest = async (params: FormData): Promise<ICreateCollectionPayload> => {
  const { data } = await request({
    url: `/collection-admin/create`,
    method: 'POST',
    data: params,
  });
  return data as any;
};

export const createLayer = async (params: FormData): Promise<any> => {
  const { data } = await request({
    url: `/collection-admin/create-layer-images`,
    method: 'POST',
    data: params,
    headers: { 'content-type': 'multipart/form-data' },
  });
  return data as any;
};

export const getLayerPreview = async (params: ILayerPreviewParams): Promise<ILayerCreate> => {
  const { data } = await request({
    url: `/collection-admin/layer-preview`,
    method: 'GET',
    params: params,
  });
  return data as any;
};

export const createImage = async (params: Partial<ICreateImage>): Promise<any> => {
  const formData = new FormData();
  if (params.name) formData.append('name', params.name);
  if (params.description) formData.append('description', params.description);
  if (params.image) formData.append('image', params.image);
  if (params.quantity) formData.append('quantity', params.quantity);
  const { data } = await request({
    url: `/collection-admin/create-image?collectionId=${params.collectionId}&layerId=${params.layerId}`,
    method: 'POST',
    data: formData,
    headers: { 'content-type': 'multipart/form-data' },
  });
  return data as any;
};

export const getCollectionById = async (id: number): Promise<ICollection> => {
  const { data } = await request({
    url: `/collection-admin/${id}`,
    method: 'GET',
  });
  return data as any;
};

export const createDraftRequest = async (id: number): Promise<any> => {
  const { data } = await request({
    url: `/nft-admin/create-draft/${id}`,
    method: 'PUT',
  });
  return data as any;
};

export const getListCollections = async (params: any): Promise<IListCollection> => {
  let url = `/collection-admin/list?page=${params.page}&limit=${params.limit}`;
  if (params.name) url += `&name=${params.name}`;
  // if (params.type) url += `&type=${params.type.join(',')}`;
  // if (params.networkId) url += `&networkId=${params.networkId}`;
  // if (params.isImport) url += `&isImport=0`;
  const res: any = await request({
    url: url,
    method: 'GET',
  });
  return {
    items: res?.data,
    meta: res?.meta?.pagination,
  };
};

export const getListLayerByCollectionId = async (params: number): Promise<IListLayers> => {
  const res: any = await request({
    url: `/collection-admin/layer/list?collectionId=${params}`,
    method: 'GET',
  });
  return {
    items: res?.data,
    meta: res?.meta?.pagination,
  };
};

export const getListImageLayer = async (params: IListImageLayerParams): Promise<IListImageLayer> => {
  const res: any = await request({
    url: `collection-admin/layer/image/list`,
    method: 'GET',
    params: params,
  });

  return {
    data: res?.data,
    meta: res?.meta?.pagination,
  };
};

export const putCollectionPublic = async (params: number): Promise<ICollection> => {
  const res: any = await request({
    url: `collection-admin/${params}`,
    method: 'PUT',
  });
  return res?.data;
};

export const updateCollectionRequest = async (params: Partial<ICreateCollectionPayload>): Promise<ICollection> => {
  const formData = new FormData();
  if (params.name) formData.append('name', params.name);
  if (params.description) formData.append('description', params.description);
  if (params.chainId) formData.append('chainId', params.chainId);
  if (params.imageUrl) formData.append('imageUrl', params.imageUrl);
  if (params.bannerUrl) formData.append('bannerUrl', params.bannerUrl);
  if (params.paymentToken) formData.append('paymentToken', params.paymentToken);
  if (params.startMintTime) formData.append('startMintTime', String(params.startMintTime));
  if (params.endMintTime) formData.append('endMintTime', String(params.endMintTime));
  if (params.price) formData.append('price', params.price);
  if (params.type) formData.append('type', params.type);
  // formData.append('price', '0');
  // formData.append('totalNfts', '4');
  // formData.append('numberLayers', '2');
  const { data } = await request({
    url: `/collection-admin/update/${params.id}`,
    method: 'POST',
    data: formData,
    headers: { 'content-type': 'multipart/form-data' },
  });
  return data as any;
};

export const updateLayer = async (params: FormData): Promise<any> => {
  const { data } = await request({
    url: `/collection-admin/update-layer-images`,
    method: 'POST',
    data: params,
    headers: { 'content-type': 'multipart/form-data' },
  });
  return data as any;
};

export const getListImageByLayerId = async (params: number): Promise<IListImageLayer> => {
  const res: any = await request({
    url: `/collection-admin/layer/image/list?layerId=${params}`,
    method: 'GET',
  });

  return {
    data: res?.data,
    meta: res?.meta,
  };
};

export const draftNFT = async (params: FormData): Promise<IDraftINFTResponse> => {
  const res: any = await request({
    url: 'nft-admin/create-offchain',
    method: 'POST',
    data: params,
  });

  return res?.data;
};

export const getListDraftNft = async (params: any): Promise<IListNFT> => {
  const res: any = await request({
    url: `nft-admin/list-my-nft-offchain`,
    method: 'GET',
    params: params,
  });

  return {
    items: res?.data,
    meta: res?.meta?.pagination,
  };
};

export const getDraftNftDetail = async (params: any): Promise<IDraftDetail> => {
  const { data } = await request({
    url: `nft-admin/offchain/${params}`,
    method: 'GET',
  });

  return data as any;
};

export const updateDraftNftDetail = async (params: IUpdateDraftNft): Promise<any> => {
  const { data } = await request({
    url: `nft-admin/update-offchain/${params.id}`,
    method: 'POST',
    data: params.formData,
  });

  return data as any;
};

///////////////////////////
export const getGalleryCollections = async (): Promise<ICollection[]> => {
  const { data } = await request({
    url: `/collections`,
    method: 'GET',
  });
  return data as any;
};

export const checkNameCollectionRequest = async (name: string): Promise<ICollection> => {
  const { data } = await request({
    url: `/collections/check-name?name=${name}`,
    method: 'GET',
  });
  return data as any;
};

export const getListNFTByCollectionId = async (params: INFTByCollectionIdParams): Promise<INFTByCollectionId> => {
  const { data } = await request({
    url: `/nfts/list-nfts-by-collection-id`,
    method: 'POST',
    data: params,
  });
  return data as any;
};

export const getCollectionActivities = async (params: IGetActivitiesParams) => {
  const { data } = await request({
    url: `/activity/by-collection`,
    params: {
      ...params,
      collecttionId: params.collectionId,
    },
  });

  return data as any;
};

export const getPublicCollections = async (params: IGetPublicCollectionParams) => {
  const { data } = await request({
    url: `/collections/get-by-user`,
    method: 'GET',
    params,
  });

  return data as any;
};

export const getExploreColletions = async (params: IGetExploreCollectionsParams) => {
  const { data } = await request({
    url: `/collections/explore`,
    method: 'GET',
    params,
  });

  return data as any;
};
