import { useAppStore } from '@/core/store';
import { clearDataFromSessStorage } from '@/shared/utils/helpers';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const rejectErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authUser = useAppStore.getState().authUser;

  if (authUser?.tokens.access) {
    config.headers.authorization = `Bearer ${authUser.tokens.access}`;
  }
  config.headers.Accept = 'application/json';
  return config;
};

export const authResponseInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    clearDataFromSessStorage('auth_user');
  }
  return Promise.reject(error);
};
