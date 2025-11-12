import {
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { verifyEmailSchema } from '../constants';
import type { VerifyEmailDTO } from '../types';
import { formatTime } from '@/shared/utils';
import { useAppStore } from '@/core/store';

export const useVerifyEmail = () => {
  const navigate = useNavigate({ from: '/' });
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth)

  const form = useForm<VerifyEmailDTO>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'onChange',
    defaultValues: {
      verificationCode: '',
    },
  });

  useEffect(() => {
    const timerStart = getDataFromSessStorage('verify-timer') as string;

    if (!timerStart) {
      setCanResend(true);
      setTimeLeft(0);
      return;
    }

    const startTime = parseInt(timerStart, 10);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(60 - elapsed, 0);

    setTimeLeft(remaining);
    setCanResend(remaining === 0);

    if (remaining > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const resendCode = () => {
    saveDataToSessStorage('verify-timer', Date.now().toString());
    setTimeLeft(60);
    setCanResend(false);
  };

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    console.log(data);
    navigate({
      to: '/',
      search: { step: 1 },
      replace: true,
    });
    onOpenAuth(false)
  }

  const isButtonDisabled = !form.formState.isValid;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    timeLeft: formatTime(timeLeft),
    canResend,
    resendCode,
  };
};
