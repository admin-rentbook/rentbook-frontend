import { axios, useMutation, type MutationConfig } from '@/core/lib';
import { useAppStore } from '@/core/store';
import type { ApiResponse } from '@/shared/types';
import { formatError } from '@/shared/utils/helpers';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { AuthUser, LoginDTO } from '../../types';
import { url } from '../url-query';

export const login = async (data: LoginDTO) => {
  try {
    const response = await axios.post<ApiResponse<AuthUser>>(url.login, data);
    return response.data;
  } catch (err) {
    throw (formatError(err));
  }
};

type UseLoginOptions = {
  config?: MutationConfig<typeof login>;
};

export const useLoginMutation = ({ config }: UseLoginOptions = {}) => {
  const setAuthUser = useAppStore((s) => s.setAuthUser);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);
  const search = useSearch({ strict: false }) as { redirectTo?: string };
  const navigate = useNavigate();

  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'login-error' });
    },
    onSuccess: (res) => {
      toast.success(res.message ?? 'Login successful!', {
        id: 'login-success',
      });
      setAuthUser(res.data);
      onOpenAuth(false);
      navigate({ to: search.redirectTo ?? '/' });
    },
    mutationFn: login,
    ...config,
  });
};
