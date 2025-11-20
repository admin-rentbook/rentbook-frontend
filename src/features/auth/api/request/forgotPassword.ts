import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError, saveDataToSessStorage } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { url } from '../url-query';

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post<ApiResponse<{ email: string }>>(
      url.forgotPassword,
      { email }
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseForgotPasswordOptions = {
  config?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPasswordMutation = ({
  config,
}: UseForgotPasswordOptions = {}) => {
  const navigate = useNavigate();
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'forgot-password-error' });
    },
    onSuccess: (res, email) => {
      toast.success(res.message, { id: 'forgot-password-success' });
      saveDataToSessStorage('verify-timer', Date.now().toString());
      navigate({
        to: '/',
        replace: true,
        search: { step: 4 },
      });
      saveDataToSessStorage('email', email);
    },
    mutationFn: forgotPassword,
    ...config,
  });
};
