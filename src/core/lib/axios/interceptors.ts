import { useAppStore } from '@/core/store';
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
    // Check if this request has skipAuthRedirect flag
    const skipRedirect = (error.config as any)?.skipAuthRedirect;

    if (!skipRedirect) {
      const { logout } = useAppStore.getState();
      logout();

      // Redirect to landing page
      window.location.href = '/';
    }
  }
  return Promise.reject(error);
};
