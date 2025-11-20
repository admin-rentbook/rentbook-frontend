import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useForgotPasswordMutation } from '../api/request';
import { forgotPasswordSchema } from '../constants';
import type { ForgotPasswordDTO } from '../types';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPasswordMutation();
  const form = useForm<ForgotPasswordDTO>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    forgotPasswordMutation.mutate(data.email);
  }

  const handleBack = () => {
    navigate({
      to: '/',
      search: { step: 1 },
      replace: true,
    });
  };

  const isButtonDisabled =
    !form.formState.isValid || forgotPasswordMutation.isPending;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    handleBack,
    isLoading: forgotPasswordMutation.isPending,
  };
};
