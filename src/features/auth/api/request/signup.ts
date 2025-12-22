import { axios, useMutation, type MutationConfig } from '@/core/lib';
import type { ApiResponse } from '@/shared/types';
import { formatError, saveDataToSessStorage } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { SignupDTO, UserDTO } from '../../types';
import { url } from '../url-query';
import { useSendOtp } from './sendOtp';

export const signup = async (data: SignupDTO) => {
  const payload = {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    password: data.password,
  };
  try {
    const response = await axios.post<ApiResponse<UserDTO>>(
      url.signup,
      payload
    );
    return response.data;
  } catch (err) {
    throw (formatError(err));
  }
};

type UseSignUpOptions = {
  config?: MutationConfig<typeof signup>;
};

export const useSignupMutation = ({ config }: UseSignUpOptions = {}) => {
  const sendOtpMutation = useSendOtp();
  const navigate = useNavigate({ from: '/' });
  return useMutation({
    onError: (err: any) => {
      toast.error(err.description, { id: 'signup-success' });
    },
    onSuccess: (res, variable) => {
      saveDataToSessStorage('verify-timer', Date.now().toString());
      sendOtpMutation.mutate(res.data.email, {
        onSuccess: () => {
          navigate({
            to: '/',
            search: { step: 2, email: variable.email },
            replace: true,
          });
        },
      });
    },
    mutationFn: signup,
    ...config,
  });
};
