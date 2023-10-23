import { useQuery, UseQueryOptions } from 'react-query';
import { getDetailUsers, getListUsers, getRoyalInfo } from './request';
import { IListUserParams, IListUsers, IRoyalResponse, IUser } from './types';

export const useGetUsers = (params: IListUserParams, option?: UseQueryOptions<IListUsers, Error>) => {
  return useQuery<IListUsers, Error>(['/user/list', params], () => getListUsers(params), option);
};

export const useDetailUsers = (params: number, option?: UseQueryOptions<IUser, Error>) => {
  return useQuery<IUser, Error>([`/admin/user/item`, params], () => getDetailUsers(params), option);
};

export const useRoyalInfo = (option?: UseQueryOptions<IRoyalResponse, Error>) => {
  return useQuery<IRoyalResponse, Error>([`/admin/user/royal`], () => getRoyalInfo(), option);
};
