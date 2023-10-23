import { PagedMeta, Paging } from 'types/util.types';
import { StringLiteral } from 'typescript';

export interface IUser {
  id: number;
  email: string;
  username: StringLiteral;
  avatarUrl: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  phone: string;
  nationality: string;
  country: string;
  zipCode: string;
  state: string;
  city: string;
  street1: string;
  street2: string;
  status: string;
  createdAt: string;
  updateAt: string;
  isActive2fa: number;
  twoFactorAuthenticationSecret: string;
  statusKyc: string;
  wallet: string;
  data: string;
}

export interface IListUsers {
  meta: PagedMeta;
  items: IUser[];
}

export interface IListUserParams extends Paging {
  username?: string;
  email?: string;
}

export interface IRoyalParams {
  wallet?: string;
}

export interface IRoyalInfo {
  status: string;
  endTime: string;
}

export interface IRoyalResponse {
  data: IRoyalInfo[];
}
