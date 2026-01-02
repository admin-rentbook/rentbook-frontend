import { useAppStore } from '@/core/store';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Extend AxiosRequestConfig to include custom properties
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
    skipAuth?: boolean;
  }
}

export const rejectErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authUser = useAppStore.getState().authUser;

  // Skip adding authorization header if skipAuth is true
  if (!config.skipAuth && authUser?.tokens.access) {
    config.headers.authorization = `Bearer ${authUser.tokens.access}`;
  }
  config.headers.Accept = 'application/json';
  return config;
};

// Flag to prevent multiple redirects
let isRedirecting = false;

export const authResponseInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    // Check if this request has skipAuthRedirect flag
    const skipRedirect = error.config?.skipAuthRedirect;

    if (!skipRedirect && !isRedirecting) {
      isRedirecting = true;
      const { logout } = useAppStore.getState();
      logout();

      // Redirect to landing page
      window.location.href = '/';
    }
  }
  return Promise.reject(error);
};
