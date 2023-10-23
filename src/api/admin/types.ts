import { PagedMeta, Paging } from 'types/util.types';

export interface ICreateArtistParams {
  name: string;
  image: string;
  bio: string;
  banner: string;
}

export interface IAdmin {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  code: string;
  walletAddress: string;
  createdAt: string;
  updateAt: string;
  isActive: number;
  type: number;
}

export interface IListAdmin {
  meta: PagedMeta;
  items: IAdmin[];
}

export interface IListAdminParams extends Paging {
  username?: string;
  email?: string;
  type?: number;
}

export interface IRoyalUser {
  artistId: number;
  nameArtist: string;
  endTime: number;
  status: string;
}

export interface IListRoyal {
  items: IRoyalUser[];
  meta: PagedMeta;
}
