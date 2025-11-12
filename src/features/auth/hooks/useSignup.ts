import { saveDataToSessStorage } from '@/shared/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { signupSchema } from '../constants';
import type { SignupDTO } from '../types';

export const useSignup = () => {
  const navigate = useNavigate({ from: '/' });
  const search = useSearch({ from: '/' });
  const currentStep = search.step || 1;
  const form = useForm<SignupDTO>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
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
    console.log(data);
    navigate({
      to: '/',
      search: { step: currentStep + 1 },
      replace: true,
    });
    saveDataToSessStorage('verify-timer', Date.now().toString());
  }

  const isButtonDisabled = !form.formState.isValid;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    isPasswordFocused,
    handlePasswordFocus,
    handlePasswordBlur,
  };
};
