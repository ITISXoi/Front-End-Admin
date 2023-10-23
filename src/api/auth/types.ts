export interface IAuthParams {
  username?: string;
  email?: string;
  password?: string;
}

export interface ILoginResponse {
  token: string;
  expires_in: number;
  refresh_token: string;
  token_type: 'bearer';
}

export interface IAccountCreateParams {
  email: string;
  fullName: string;
  type: number;
  password: string;
}
export interface IUser {
  avatarUrl?: string;
  city?: string;
  country?: string;
  createdAt: string;
  data?: string;
  dateOfBirth?: string;
  email: string;
  firstName?: string;
  id: number;
  isActive2fa: number;
  statusKyc?: 'none' | 'pending' | 'approved';
  lastName?: string;
  nationality?: string;
  phone?: string;
  state?: string;
  status: string;
  street1?: string;
  street2?: string;
  updatedAt: '1644161456670';
  username: string;
  wallet?: string;
  zipCode?: string;
  bio?: string;
  backgroundUrl?: string;
  type?: number;
}

export interface IMFACode {
  twoFactorAuthenticationSecret: string;
}

export interface IUpdateProfileParams {
  username: string;
  bio: string;
  avatar?: File | null;
  background?: File | null;
}

export interface ILoginParams {
  wallet: string;
  signature: string;
  twofa?: string;
}

export interface IRegisterParams {
  address: string;
  email: string;
  username: string;
  signature: string;
}

export const SIGN_MESSAGE =
  'Welcome. By signing this message you are verifying your digital identity. This is completely secure and does not cost anything!';

export interface ICheckLogin2FAParams {
  wallet?: string;
  email?: string;
}
