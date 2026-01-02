import {
  axios,
  useMutation,
  type MutationConfig,
} from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { url } from '../url-query';

type ResendVerificationResponse = {
  success: boolean;
  message: string;
};

const resendVerification = async (propertyId: number) => {
  try {
    const response = await axios.post<ApiResponse<ResendVerificationResponse>>(
      url.resendVerification(propertyId)
    );
    return response.data;
  } catch (err) {
    throw formatError(err);
  }
};

type UseResendVerificationOptions = {
  config?: MutationConfig<typeof resendVerification>;
};

export const useResendVerification = ({ config }: UseResendVerificationOptions = {}) => {
  return useMutation({
    onSuccess: (response) => {
      toast.success(
        response?.message || 'Verification email sent successfully!',
        { id: 'resend-verification-success' }
      );
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to resend verification email';
      toast.error(errorMessage, { id: 'resend-verification-error' });
    },
    mutationFn: resendVerification,
    ...config,
  });
};