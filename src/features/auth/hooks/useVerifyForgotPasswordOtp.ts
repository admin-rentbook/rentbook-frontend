import { useTimer } from '@/shared/hooks';
import { getDataFromSessStorage } from '@/shared/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useVerifyForgotPasswordOtpMutation } from '../api/request';
import { verifyEmailSchema } from '../constants';
import type { VerifyEmailDTO } from '../types';

export const useVerifyForgotPasswordOtp = () => {
  const verifyForgotPasswordOtpMutation = useVerifyForgotPasswordOtpMutation();

  const form = useForm<VerifyEmailDTO>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'onChange',
    defaultValues: {
      otp: '',
    },
  });

  const { timeLeft, canResend, resendCode } = useTimer(60 * 5);

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    const email = getDataFromSessStorage('email') as string;
    const payload = {
      otp: Number(data.otp),
      email: email,
    };
    verifyForgotPasswordOtpMutation.mutate(payload);
  }

  const isButtonDisabled =
    !form.formState.isValid || verifyForgotPasswordOtpMutation.isPending;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    timeLeft,
    canResend,
    resendCode,
    isLoading: verifyForgotPasswordOtpMutation.isPending,
  };
};
