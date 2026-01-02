import {
  axios,
  useMutation,
  type MutationConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { url } from '../url-query';

type VerifyTokenResponse = {
  success: boolean;
  message: string;
  property_id?: number;
  property_name?: string;
  verified: boolean;
};

const verifyToken = async (token: string) => {
  try {
    const response = await axios.get<ApiResponse<VerifyTokenResponse>>(
      url.verifyToken(token),
      {
        skipAuthRedirect: true,
      }
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseVerifyTokenOptions = {
  config?: MutationConfig<typeof verifyToken>;
};

export const useVerifyToken = ({ config }: UseVerifyTokenOptions = {}) => {
  return useMutation({
    onSuccess: (response) => {
      if (response.data.verified) {
        toast.success(
          response?.message || 'Property ownership verified successfully!',
          { id: 'verify-token-success' }
        );
      } else {
        toast.error(
          response?.message || 'Token verification failed',
          { id: 'verify-token-error' }
        );
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to verify token';
      toast.error(errorMessage, { id: 'verify-token-error' });
    },
    mutationFn: verifyToken,
    ...config,
  });
};