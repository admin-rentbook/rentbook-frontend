import { useAppStore } from '@/core/store';
import { refreshToken } from '@/features/auth/api/request';
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

// Extend AxiosRequestConfig to include custom properties
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
    skipAuth?: boolean;
    _retry?: boolean; // Flag to prevent infinite retry loops
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

// Track ongoing refresh request to prevent multiple simultaneous refresh calls
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export const createAuthResponseInterceptor = (axiosInstance: AxiosInstance) => {
  return async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    // Check if this is a 401 error and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      const skipRedirect = originalRequest?.skipAuthRedirect;

      // For public endpoints with skipAuthRedirect, retry without auth header
      // This allows the request to gracefully fall back to unauthenticated mode
      if (skipRedirect) {
        originalRequest._retry = true;
        // Remove authorization header and retry as unauthenticated request
        if (originalRequest.headers) {
          delete originalRequest.headers.authorization;
        }
        return axiosInstance(originalRequest);
      }

      const { authUser, setAuthUser, setTokenExpired, logout } =
        useAppStore.getState();
      // If no refresh token available, logout immediately
      if (!authUser?.tokens.refresh) {
        logout();
        setTokenExpired(true);
        return Promise.reject(error);
      }

      // Mark this request as retried to prevent infinite loops
      originalRequest._retry = true;

      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.authorization = `Bearer ${token}`;
            }
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const updatedAuthUser = await refreshToken(authUser.tokens.refresh);

        // Update the user session with new tokens
        setAuthUser(updatedAuthUser);

        // Notify all queued requests about the new token
        onTokenRefreshed(updatedAuthUser.tokens.access);

        // Retry the original request with the new access token
        if (originalRequest.headers) {
          originalRequest.headers.authorization = `Bearer ${updatedAuthUser.tokens.access}`;
        }

        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout the user
        isRefreshing = false;
        refreshSubscribers = [];
        logout();
        setTokenExpired(true);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  };
};
