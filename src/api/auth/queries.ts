import { useQuery, UseQueryOptions } from 'react-query';

import { parseJson } from 'utils/common';
import { STORAGE_KEY } from 'utils/constants';

import { get2FACode, getUser } from './request';
import { IMFACode, IUser } from './types';

export const useUser = (option?: UseQueryOptions<IUser, Error>) => {
  const { data, ...rest } = useQuery<IUser, Error>('me', getUser, {
    enabled: false,
    initialData: parseJson(localStorage.getItem(STORAGE_KEY.user)) as any,
    onSuccess: (data) => localStorage.setItem(STORAGE_KEY.user, JSON.stringify(data)),
    onError: () => {
      localStorage.removeItem(STORAGE_KEY.user);
    },
    ...option,
  });
  return { user: data, isAdmin: data?.type === 1, ...rest };
};

export const use2FACode = (option?: UseQueryOptions<IMFACode, Error>) => {
  return useQuery<IMFACode, Error>('/user/get-2fa', get2FACode, option);
};
