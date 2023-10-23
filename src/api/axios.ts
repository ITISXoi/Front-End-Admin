import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import store from 'store';
import { triggerLogout } from 'store/ducks/system/slice';
import { API_URL, STORAGE_KEY } from 'utils/constants';

export const request = axios.create({
  baseURL: API_URL,
});

const handleError = async (error: AxiosError) => {
  const data = error?.response?.data as any;
  const message = data.meta.message;

  let originalRequest: any = error.config;
  const isTokenExpired = error?.response?.status === 401 || error?.response?.status === 403;

  if (isTokenExpired) {
    localStorage.clear();
    window.location.href = '/';
  }

  // refresh token expired
  if (originalRequest?.url === '/user/auth-token' && message === 'jwt expired') {
    toast.error('Your session has expired. Please login again.');
    store.dispatch(triggerLogout(true));
  }

  return Promise.reject(data?.meta || data || error);
};

const handleSuccess = async (res: AxiosResponse) => {
  return res.data;
};

const handleRequest = async (config: AxiosRequestConfig) => {
  const token = localStorage.getItem(STORAGE_KEY.token);

  if (token) {
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
};

request.interceptors.response.use(handleSuccess, handleError);

request.interceptors.request.use(handleRequest, (error) => Promise.reject(error));
