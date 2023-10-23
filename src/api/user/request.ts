import { request } from '../axios';
import { IListUserParams, IListUsers, IRoyalParams, IRoyalResponse, IUser } from './types';

export const getListUsers = async (params: IListUserParams): Promise<IListUsers> => {
  const res: any = await request({
    url: '/admin/list-user',
    method: 'GET',
    params: params,
  });

  return {
    meta: res?.meta.pagination,
    items: res?.data,
  };
};

export const getDetailUsers = async (params: number): Promise<IUser> => {
  const res: any = await request({
    url: `/admin/user/${params}`,
    method: 'GET',
  });

  return res?.data;
};

export const getRoyalInfo = async (): Promise<IRoyalResponse> => {
  const res: any = await request({
    url: `/admin/subscribe-premium-pack`,
    method: 'GET',
  });

  return res;
};

export const buyPremiumRequest = async (params: IRoyalParams): Promise<any> => {
  const res: any = await request({
    url: `/admin/subscribe-premium-pack`,
    method: 'POST',
    data: params,
  });

  return res?.data;
};
