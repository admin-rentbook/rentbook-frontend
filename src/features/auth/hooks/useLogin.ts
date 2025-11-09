import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { loginSchema } from '../constants';
import type { LoginDTO } from '../types';

export const useLogin = () => {
  const form = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
  }

  const isButtonDisabled = !form.formState.isValid;
  return {
    form,
    onSubmit,
    isButtonDisabled,
  };
};
