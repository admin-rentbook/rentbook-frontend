import Axios from 'axios';
import { env } from '@/config';
import type { ApiResponse } from '@/shared/types';
import type { AuthUser } from '../../types';

type RefreshTokenResponse = {
  access: string;
  refresh: string;
};

/**
 * Refresh the access token using the refresh token
 * Note: This function uses a separate Axios instance to avoid triggering interceptors
 */
export const refreshToken = async (refreshToken: string): Promise<AuthUser> => {
  const response = await Axios.post<ApiResponse<RefreshTokenResponse>>(
    `${env.API_BASE_URL}/auth/token/refresh/`,
    { refresh: refreshToken },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  // Get the current user data from session storage
  const authUserJson = sessionStorage.getItem('auth_user');
  if (!authUserJson) {
    throw new Error('No user session found');
  }

  const currentAuthUser = JSON.parse(authUserJson) as AuthUser;

  // Return updated AuthUser with new tokens
  return {
    ...currentAuthUser,
    tokens: {
      access: response.data.data.access,
      refresh: response.data.data.refresh,
    },
  };
};
