export interface IListCurrencyParams {
  network?: string;
  chainName?: string;
  chainId?: number | string;
  status?: string;
  isNativeToken?: 0 | 1;
  decimal?: number;
  contract_address?: string;
}

export interface ICurrencyToken {
  tokenName: string;
  decimal: number;
  chainId: string;
  contractAddress: string;
  status: number;
  isNativeToken: number;
  createdAt: string;
  updatedAt: string;
  currency: string;
  icon: string;
  id: number;
  network: string;
  chainName: string;
  rpcEndpoint: string;
  explorerEndpoint: string;
  scanApi: string;
  scAddress: string;
  market: string;
  auction: string;
  lootBox: string;
}
//////////////////////////////////
export type IToken = '721' | '1155' | 'FARM';
export type ICategory = {
  id: number;
  name: 'Sound' | 'Video' | 'Image' | 'Other';
  src: string;
  desc: string;
};

export type IMaintenance = { isMaintenance: number };
export interface INetwork {
  id: number;
  name: string;
  chainId: number;
  marketContract: string;
  polka1155GeneralContract: string;
  polka721Contract: string;
  referralContract: string;
  polkaUriContract: string;
  auctionContract: string;
  rpc: string;
  image: string;
  gasLimit: number;
  gasLimitCollection: number;
  gasPrice: string;
  status: number;
  createdAt: string;
  networkTokens: INetworkToken[];
}

export interface INetworkToken {
  id: number;
  tokenName: string;
  decimal: number;
  networkId: number;
  contractAddress: string;
  status: number;
  isNativeToken: number;
  currency: string;
  icon: string;
  createdAt: string;
}

export interface ITxExternalWalletParams {
  txHash: string;
  action: number;
  networkId: number;
}

export interface IExchangeRate {
  from_coin: string;
  to_coin: string;
  exchange_rate: number;
}
