import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useSignupMutation } from '../api/request';
import { signupSchema } from '../constants';
import type { SignupDTO } from '../types';

export const useSignup = () => {
  const signupMutation = useSignupMutation();
  const form = useForm<SignupDTO>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  function onSubmit(data: z.infer<typeof signupSchema>) {
    signupMutation.mutate(data);
  }

  const isButtonDisabled = !form.formState.isValid && signupMutation.isPending;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    isPasswordFocused,
    handlePasswordFocus,
    handlePasswordBlur,
    isLoading: signupMutation.isPending,
  };
};
