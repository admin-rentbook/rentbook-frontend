import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { signupSchema } from '../constants';
import { useAuthStore } from '../providers';
import type { SignupDTO } from '../types';

export const useSignup = () => {
  const form = useForm<SignupDTO>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
  });

  const next = useAuthStore((s) => s.next);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  function onSubmit(data: z.infer<typeof signupSchema>) {
    console.log(data);
    next()
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
