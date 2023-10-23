import { Paging } from 'types/util.types';
import { request } from '../axios';
import { IAdmin, IListAdmin, IListAdminParams, IListRoyal } from './types';

export const createArtist = async (update: FormData) => {
  const { data } = await request({
    url: '/users',
    method: 'POST',
    data: update,
  });

  return data as any;
};

export const getListAdmin = async (params: IListAdminParams): Promise<IListAdmin> => {
  const res: any = await request({
    url: '/admin/list',
    method: 'GET',
    params: params,
  });

  return {
    meta: res?.meta?.pagination,
    items: res?.data,
  };
};

export const getListRoyal = async (params: Paging): Promise<IListRoyal> => {
  const res: any = await request({
    url: '/admin/list-subscribe-premium-pack',
    method: 'GET',
    params: params,
  });

  return {
    meta: res?.meta?.pagination,
    items: res?.data,
  };
};

export const getDetailAdmin = async (params: number): Promise<IAdmin> => {
  const res: any = await request({
    url: `/admin/${params}`,
    method: 'GET',
  });

  return res?.data;
};

export const updatePassword = async (params: { oldPassword: string; newPassword: string }): Promise<any> => {
  const res: any = await request({
    url: `/admin/update-password`,
    method: 'POST',
    data: params,
  });

  return res?.data;
};
