import { useQuery, UseQueryOptions } from 'react-query';
import {
  getCategoryRequest,
  getExchangeRateRequest,
  getListCurrencyToken,
  getMaintenanceStatus,
  getNetworkRequest,
} from './request';
import { ICategory, ICurrencyToken, IExchangeRate, IListCurrencyParams, IMaintenance, INetwork } from './types';

export const useListCurrencyToken = (
  params?: IListCurrencyParams,
  option?: UseQueryOptions<ICurrencyToken[], Error>
) => {
  return useQuery<ICurrencyToken[], Error>(['/currency-token/list', params], () => getListCurrencyToken(params), {
    ...option,
  });
};

///////////////////////////////////////////////////////////////////////////
export const useNetwork = (option?: UseQueryOptions<INetwork[], Error>) => {
  return useQuery<INetwork[], Error>('/network', getNetworkRequest, option);
};

export const useCategory = (option?: UseQueryOptions<ICategory[], Error>) => {
  return useQuery<ICategory[], Error>('/categories', getCategoryRequest, option);
};

export const useExchangeRate = (
  params: { from: string; to: string },
  option?: UseQueryOptions<IExchangeRate, Error>
) => {
  return useQuery<IExchangeRate, Error>(
    `/sale-nft/exchange-rate-coin?from_coin=${params.from}&to_coin=${params.to}`,
    () => getExchangeRateRequest(params),
    { enabled: !!params.from && params.from !== 'null' && params.from !== 'undefined', ...option }
  );
};

export const useMaintenance = (option?: UseQueryOptions<IMaintenance, Error>) => {
  return useQuery<IMaintenance, Error>('/setting/maintenance', getMaintenanceStatus, option);
};
