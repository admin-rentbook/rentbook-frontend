import { axios, useMutation, type MutationConfig } from '@/core/lib';
import { useAppStore } from '@/core/store';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { AuthUser } from '../../types';
import { url } from '../url-query';

export const googleAuth = async (token: string) => {
  try {
    const response = await axios.post<ApiResponse<AuthUser>>(url.googleAuth, {
      token,
    });
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseGoogleAuthOptions = {
  config?: MutationConfig<typeof googleAuth>;
};

export const useGoogleAuth = ({ config }: UseGoogleAuthOptions = {}) => {
  const navigate = useNavigate({ from: '/' });
  const setAuthUser = useAppStore((s) => s.setAuthUser);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'google-auth-error' });
      navigate({ to: '/', replace: true });
    },
    onSuccess: (res) => {
      toast.success(res.message ?? 'Login successful!', {
        id: 'google-auth-success',
      });
      setAuthUser(res.data);
      onOpenAuth(false);
    },
    mutationFn: (token: string) => googleAuth(token),
    ...config,
  });
};
