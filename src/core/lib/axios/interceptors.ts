import { useAppStore } from '@/core/store';
import type { InternalAxiosRequestConfig } from 'axios';

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
