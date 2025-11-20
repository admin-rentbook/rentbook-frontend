import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { clearDataFromSessStorage, formatError } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { url } from '../url-query';

type VerifyEmailDTO = {
  email: string;
  otp: number;
};

export const verifyEmail = async (data: VerifyEmailDTO) => {
  try {
    const response = await axios.post<ApiResponse<VerifyEmailDTO>>(
      url.verifyEmail,
      data
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseVerifyEmailOptions = {
  config?: MutationConfig<typeof verifyEmail>;
};

export const useVerifyEmailMutation = ({
  config,
}: UseVerifyEmailOptions = {}) => {
  const navigate = useNavigate();
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'verify-error' });
    },
    onSuccess: (res) => {
      toast.success(res.message, { id: 'verify-success' });
      navigate({
        to: '/',
        replace: true,
        search: { step: 1 },
      });
      clearDataFromSessStorage('email');
    },
    mutationFn: verifyEmail,
    ...config,
  });
};
