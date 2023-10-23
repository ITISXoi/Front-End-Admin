import { IListNFT } from 'api/nft';
import { useQuery, UseQueryOptions } from 'react-query';
import {
  getCollectionById,
  getDraftNftDetail,
  getExploreColletions,
  getGalleryCollections,
  getLayerPreview,
  getListCollections,
  getListDraftNft,
  getListImageByLayerId,
  getListImageLayer,
  getListLayerByCollectionId,
  getListNFTByCollectionId,
  getPublicCollections,
  putCollectionPublic,
} from './request';
import {
  ICollection,
  IDraftDetail,
  IGetExploreCollectionsParams,
  IGetPublicCollectionParams,
  ILayerCreate,
  ILayerPreviewParams,
  IListCollection,
  IListCollectionResponse,
  IListImageLayer,
  IListImageLayerParams,
  IListLayers,
  INFTByCollectionId,
  INFTByCollectionIdParams,
} from './types';

export const useCollectionPublic = (params: number, option?: UseQueryOptions<ICollection, Error>) => {
  return useQuery<ICollection, Error>(
    ['/collection-admin/public/id', params],
    () => putCollectionPublic(params),
    option
  );
};

export const useLayerPreview = (params: ILayerPreviewParams, option?: UseQueryOptions<ILayerCreate, Error>) => {
  return useQuery<ILayerCreate, Error>(
    ['/collection-admin/layer-preview', params],
    () => getLayerPreview(params),
    option
  );
};

export const useListImageLayer = (params: IListImageLayerParams, option?: UseQueryOptions<IListImageLayer, Error>) => {
  return useQuery<IListImageLayer, Error>(
    ['/collection-admin/layer/image/list', params],
    () => getListImageLayer(params),
    option
  );
};

export const useListImageByLayerId = (params: number, option?: UseQueryOptions<IListImageLayer, Error>) => {
  return useQuery<IListImageLayer, Error>(
    [`/nfts/list-nfts-by-collection-id`, params],
    () => getListImageByLayerId(params),
    option
  );
};

export const useListCollections = (params: any, option?: UseQueryOptions<IListCollection, Error>) => {
  return useQuery<IListCollection, Error>(
    ['/collections/get-by-paging', params],
    () => getListCollections(params),
    option
  );
};

export const useCollection = (id: number, option?: UseQueryOptions<ICollection, Error>) => {
  return useQuery<ICollection, Error>(`/collections/${id}`, () => getCollectionById(id), option);
};

export const useListLayer = (params: number, option?: UseQueryOptions<IListLayers, Error>) => {
  return useQuery<IListLayers, Error>(
    [`/nfts/list-nfts-by-collection-id`, params],
    () => getListLayerByCollectionId(params),
    option
  );
};

export const useNFTByCollectionId = (
  params: INFTByCollectionIdParams,
  option?: UseQueryOptions<INFTByCollectionId, Error>
) => {
  return useQuery<INFTByCollectionId, Error>(
    [`/nfts/list-nfts-by-collection-id`, params],
    () => getListNFTByCollectionId(makeLoadAll(params)),
    option
  );
};

export const usePublicCollections = (
  params: IGetPublicCollectionParams,
  options?: UseQueryOptions<IListCollectionResponse, Error>
) => {
  return useQuery<IListCollectionResponse, Error>(
    [`/collections/get-by-user`, params],
    () => getPublicCollections(params),
    options
  );
};

export const useGalleryCollections = (option?: UseQueryOptions<ICollection[], Error>) => {
  return useQuery<ICollection[], Error>(['/gallery/collections'], getGalleryCollections, option);
};
function makeLoadAll<T extends { limit?: number }>(params: T): T {
  return {
    ...params,
    limit: 150,
  };
}

export const useExploreCollections = (
  params: IGetExploreCollectionsParams,
  options?: UseQueryOptions<IListCollectionResponse, Error>
) => {
  return useQuery<IListCollectionResponse, Error>(
    [`/collections/explore`, params],
    () => getExploreColletions(params),
    options
  );
};

export const useListAllDraftNFT = (params: any, option?: UseQueryOptions<IListNFT, Error>) => {
  return useQuery<IListNFT, Error>(['/nft/list-all-draft-nft', params], () => getListDraftNft(params), option);
};

export const useDraftNFTDetail = (id: number, option?: UseQueryOptions<IDraftDetail, Error>) => {
  return useQuery<IDraftDetail, Error>(`/draft-detail/${id}`, () => getDraftNftDetail(id), option);
};
