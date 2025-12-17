import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { url } from '../url-query';

type VerifyEmailDTO = {
  email: string;
  otp: number;
};

export const verifyForgotPasswordOtp = async (data: VerifyEmailDTO) => {
  try {
    const response = await axios.post<ApiResponse<VerifyEmailDTO>>(
      url.verifyForgotPasswordEmailOtp,
      data
    );
    return response.data;
  } catch (err) {
    throw (formatError(err));
  }
};

type UseVerifyForgotPasswordOtpOptions = {
  config?: MutationConfig<typeof verifyForgotPasswordOtp>;
};

export const useVerifyForgotPasswordOtpMutation = ({
  config,
}: UseVerifyForgotPasswordOtpOptions = {}) => {
  const navigate = useNavigate();
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'verify-for-error' });
    },
    onSuccess: (res) => {
      toast.success(res.message, { id: 'verify-for-success' });
      navigate({
        to: '/',
        replace: true,
        search: { step: 5 },
      });
    },
    mutationFn: verifyForgotPasswordOtp,
    ...config,
  });
};
