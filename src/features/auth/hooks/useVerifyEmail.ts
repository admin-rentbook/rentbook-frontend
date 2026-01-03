import { useTimer } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useSendOtp, useVerifyEmailMutation } from '../api/request';
import { verifyEmailSchema } from '../constants';
import type { VerifyEmailDTO } from '../types';

export const useVerifyEmail = () => {
  const verifyEmailMutation = useVerifyEmailMutation();
  const sendOtpMutation = useSendOtp();

  const form = useForm<VerifyEmailDTO>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'onChange',
    defaultValues: {
      otp: '',
    },
  });

  const { timeLeft, canResend, resendCode } = useTimer(60 * 5);

  const search = useSearch({ strict: false }) as { email?: string };
  const email = search?.email;

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    const payload = {
      otp: Number(data.otp),
      email: email ?? '',
    };
    verifyEmailMutation.mutate(payload);
  }

  const handleSendOtp = () => {
    sendOtpMutation.mutate(email ?? '', {
      onSuccess: () => {
        resendCode();
      },
    });
  };

  const isButtonDisabled = !form.formState.isValid;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    timeLeft,
    canResend,
    handleSendOtp,
    isLoading: verifyEmailMutation.isPending,
    isOtpLoading:sendOtpMutation.isPending,
  };
};
