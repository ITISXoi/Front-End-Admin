import { useQuery, UseQueryOptions } from 'react-query';
import { Paging } from 'types/util.types';
import { getDetailAdmin, getListAdmin, getListRoyal } from './request';
import { IAdmin, IListAdmin, IListAdminParams, IListRoyal } from './types';

export const useGetAdmin = (params: IListAdminParams, option?: UseQueryOptions<IListAdmin, Error>) => {
  return useQuery<IListAdmin, Error>(['/admin/list', params], () => getListAdmin(params), option);
};
export const useGetArtist = (params: IListAdminParams, option?: UseQueryOptions<IListAdmin, Error>) => {
  return useQuery<IListAdmin, Error>(['/artist/list', params], () => getListAdmin(params), option);
};

export const useGetRoyalList = (params: Paging, option?: UseQueryOptions<IListRoyal, Error>) => {
  return useQuery<IListRoyal, Error>(['/royal/list', params], () => getListRoyal(params), option);
};

export const useDetailAdminArtist = (params: number, option?: UseQueryOptions<IAdmin, Error>) => {
  return useQuery<IAdmin, Error>([`/admin/item`, params], () => getDetailAdmin(params), option);
};
