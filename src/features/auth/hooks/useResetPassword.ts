import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useResetPasswordMutation } from '../api/request';
import { resetPasswordSchema } from '../constants';
import type { ResetPasswordDTO } from '../types';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPasswordMutation();
  const form = useForm<ResetPasswordDTO>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    resetPasswordMutation.mutate(data);
  }

  const handleBack = () => {
    navigate({
      to: '/',
      search: { step: 3 },
      replace: true,
    });
  };

  const isButtonDisabled =
    !form.formState.isValid || resetPasswordMutation.isPending;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    handleBack,
    isPasswordFocused,
    handlePasswordFocus,
    handlePasswordBlur,
    isLoading: resetPasswordMutation.isPending,
  };
};
