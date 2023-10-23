export type Await<T> = T extends Promise<infer U> ? U : T;

type Join<S1, S2> = S1 extends string ? (S2 extends string ? `${S1}.${S2}` : never) : never;

export type Paths<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? Join<K, Paths<T[K]>> : K;
}[keyof T];

export type ObjectTypes = { [key: string]: string };

export type Undefined<T> = undefined | T;

export type Paging = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'DESC' | 'ASC';
};

export type Identify = {
  id?: number;
};

export type PagedMeta = {
  itemCount: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
};

export type TransactionAPI = {
  from: string;
  to?: string;
  value: number;
  data: string;
  nonce: number;
  gas?: number;
  gasPrice?: number;
  networkId?: number;
};

export type SocketSigned = {
  data: {
    address: string;
    result: boolean;
    txHash: string;
  };
};

export interface ISignMetadata {
  approveData: {
    from: string;
    to: string;
    value: number;
    data: string;
    nonce: number;
    gas: number;
    gasPrice: number;
  };
  signData: {
    from: string;
    to: string;
    value: number;
    data: string;
    nonce: number;
    gas: number;
    gasPrice: number;
    networkId: number;
  };
  approveAllData: {
    from: string;
    to: string;
    value: number;
    data: string;
    nonce: number;
    gas: number;
    gasPrice: number;
  };
}

/**
 * Create a `state` and `setState` of type `T` and state name `N`
 * @example
 * THandlePair<'stateName', StateType> = { stateName: StateType; setStateName: (v: StateType) => StateType}
 */
export type THandlerPair<N extends string, T = any> = Record<N, T> &
  Record<`set${Capitalize<N>}`, (newValue: T | { (oldValue: T): T }) => void>;

export type ISortMap<K extends string = string> = Record<K, 'ASC' | 'DESC'>;

export enum SortDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type TSortDir = 'ASC' | 'DESC';

export interface IAxiosPagination {
  data: any;
  meta: any;
}

export type Identity = string | number;
