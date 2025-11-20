import { axios, useMutation, type MutationConfig } from '@/core/lib';
import { formatError } from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { url } from '../url-query';

export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post<any>(url.sendOtp, { email });
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseSendOtpOptions = {
  config?: MutationConfig<typeof sendOtp>;
};

export const useSendOtp = ({ config }: UseSendOtpOptions = {}) => {
  return useMutation({
    onError: (err) => {
      toast.error(err.message, { id: 'otp-send-error' });
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        id: 'otp-send-success',
      });
    },
    mutationFn: sendOtp,
    ...config,
  });
};
