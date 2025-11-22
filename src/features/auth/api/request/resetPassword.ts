import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import {
  clearDataFromSessStorage,
  formatError,
  getDataFromSessStorage,
} from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { ResetPasswordDTO } from '../../types';
import { url } from '../url-query';

export const resetPassword = async (data: ResetPasswordDTO) => {
  try {
    const payload = {
      email: getDataFromSessStorage('email') as string,
      new_password: data.password,
    };
    const response = await axios.post<ApiResponse<{ message: string }>>(
      url.resetPassword,
      payload
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseForgotPasswordOptions = {
  config?: MutationConfig<typeof resetPassword>;
};

export const useResetPasswordMutation = ({
  config,
}: UseForgotPasswordOptions = {}) => {
  const navigate = useNavigate();
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'reset-password-error' });
    },
    onSuccess: (res) => {
      toast.success(res.message, { id: 'reset-password-success' });

      navigate({
        to: '/',
        replace: true,
        search: { step: 1 },
      });
      clearDataFromSessStorage('email');
    },
    mutationFn: resetPassword,
    ...config,
  });
};
