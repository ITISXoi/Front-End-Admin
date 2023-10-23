import {
  IAuthParams,
  ILoginParams,
  ILoginResponse,
  IMFACode,
  IRegisterParams,
  IUpdateProfileParams,
  IUser,
} from './types';

import { request } from 'api/axios';

export const loginRequest = async (params: IAuthParams): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/admin/login',
    method: 'POST',
    data: params,
  });

  return data as any;
};

export const logoutRequest = async () => {
  return await request({
    url: '/admin/logout',
    method: 'POST',
  });
};

export const createAccount = async (params: FormData) => {
  return await request({
    url: '/admin/create',
    method: 'POST',
    data: params,
  });
};

export const checkActive2FARequest = async (params: IAuthParams): Promise<boolean> => {
  const { data } = await request({
    url: '/admin/check-login-2fa',
    method: 'POST',
    data: params,
  });
  return data === 1;
};

export const registerRequest = async (params: IAuthParams) => {
  return await request({
    url: '/admin/register',
    method: 'POST',
    data: params,
  });
};

export const resendActiveEmailRequest = async (params: { email: string }) => {
  return await request({
    url: '/admin/resend-mail-active-user',
    method: 'POST',
    data: params,
  });
};

export const sendMailResetPasswordRequest = async (params: { email: string }) => {
  return await request({
    url: '/admin/send-email-reset-password',
    method: 'POST',
    data: params,
  });
};

export const resetPasswordRequest = async (params: { code: string; password: string }) => {
  return await request({
    url: `/admin/reset-password?code=${params.code}`,
    method: 'POST',
    data: {
      password: params.password,
    },
  });
};

export const getUser = async (): Promise<IUser> => {
  const { data } = await request({
    url: `/admin/admin-info`,
    method: 'GET',
  });
  return data as any;
};

export const changePasswordRequest = async (params: { oldPassword: string; newPassword: string }): Promise<IUser> => {
  const { data } = await request({
    url: `/admin/update-password`,
    method: 'POST',
    data: params,
  });
  return data as any;
};

export const get2FACode = async (): Promise<IMFACode> => {
  const { data } = await request({
    url: `/admin/get-2fa`,
    method: 'POST',
  });
  return data as any;
};

export const active2FARequest = async (params: { twofa: string }): Promise<any> => {
  const { data } = await request({
    url: `/admin/active-2fa`,
    method: 'POST',
    data: params,
  });
  return data as any;
};

export const disable2FARequest = async (params: { twofa: string }): Promise<any> => {
  const { data } = await request({
    url: `/admin/disable-2fa`,
    method: 'POST',
    data: params,
  });
  return data as any;
};

export const updateProfileRequest = async (params: IUpdateProfileParams): Promise<IUser> => {
  const formData = new FormData();
  if (params.avatar) formData.append('avatar', params.avatar);
  if (params.background) formData.append('background', params.background);

  formData.append('username', params.username);
  formData.append('bio', params.bio);

  const { data } = await request({
    url: `/admin/update-profile`,
    method: 'POST',
    data: formData,
    headers: { 'content-type': 'multipart/form-data' },
  });
  return data as any;
};

export const getNonceRequest = async (address: string): Promise<number> => {
  const { data } = await request({
    url: `/admin/get-nonce?address=${address}`,
    method: 'GET',
  });
  return data as any;
};

export const loginExternalWallet = async (params: ILoginParams): Promise<ILoginResponse> => {
  const { data } = await request({
    url: `/admin/login-by-wallet`,
    method: 'POST',
    data: params,
  });
  return data as any;
};

export const addExternalWallet = async (params: ILoginParams): Promise<IUser> => {
  const { data } = await request({
    url: `/admin/add-wallet`,
    method: 'POST',
    data: params,
  });
  return data as any;
};

export const registerExternalWalletRequest = async (params: IRegisterParams): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/admin/register-external-wallet',
    method: 'POST',
    data: params,
  });

  return data as any;
};

export const exchangeRefreshToken = async (refreshToken: string): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/admin/auth-token',
    method: 'POST',
    data: { refreshToken: refreshToken },
  });

  return data as any;
};
