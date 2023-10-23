import { request } from 'api/axios';
import {
  ICategory,
  ICurrencyToken,
  IExchangeRate,
  IListCurrencyParams,
  IMaintenance,
  INetwork,
  ITxExternalWalletParams,
} from './types';

export const getListCurrencyToken = async (params?: IListCurrencyParams): Promise<ICurrencyToken[]> => {
  let url = `/currency-token/list`;

  let paramsRequest: any = {};
  if (params?.chainId) paramsRequest['chainId'] = params.chainId;
  if (params?.chainName) paramsRequest['chainName'] = params.chainName;
  if (params?.decimal) paramsRequest['decimal'] = params.decimal;
  if (params?.isNativeToken) paramsRequest['isNativeToken'] = params.isNativeToken;
  if (params?.network) paramsRequest['network'] = params.network;
  if (params?.status) paramsRequest['status'] = params.status;
  if (params?.contract_address) paramsRequest['contract_address'] = params.contract_address;

  const res: any = await request({
    url: url,
    method: 'GET',
    params: paramsRequest,
  });
  return res.data;
};

////////////////////////////

export const getNetworkRequest = async (): Promise<INetwork[]> => {
  const { data } = await request({
    url: `/networks`,
    method: 'GET',
  });
  return data as any;
};

export const getCategoryRequest = async (): Promise<ICategory[]> => {
  const { data } = await request({
    url: `/categories`,
    method: 'GET',
  });
  return data as any;
};
export const getMaintenanceStatus = async (): Promise<IMaintenance> => {
  const { data } = await request({
    url: `/setting/get-setting-maintenance`,
    method: 'GET',
  });
  return data as any;
};

export const sendTxExternalWalletRequest = async (params: ITxExternalWalletParams) => {
  // if (params.txHash) {
  //   let index = 0;
  //   const callApiExternalUserSend = async () => {
  //     const { data, status } = await request({
  //       url: `/transaction/external-user-send-tx`,
  //       method: 'POST',
  //       data: params,
  //     });
  //     console.log({ data, status });
  //     if (data.statusCode === 201) {
  //       index = 10;
  //     } else {
  //       index += 1;
  //     }
  //     if (index < 10) {
  //       setTimeout(() => callApiExternalUserSend(), 10000);
  //     }
  //     res = data;
  //   };
  //   await callApiExternalUserSend();
  // }
  const { data } = await request({
    url: `/transaction/external-user-send-tx`,
    method: 'POST',
    data: params,
  });

  return data as any;
};

export const getExchangeRateRequest = async (params: { from: string; to: string }): Promise<IExchangeRate> => {
  const { data } = await request({
    url: `/sale-nft/exchange-rate-coin?from_coin=${params.from}&to_coin=${params.to}`,
    method: 'GET',
  });
  return data as any;
};
