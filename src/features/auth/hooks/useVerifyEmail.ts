import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { verifyEmailSchema } from '../constants';
import type { VerifyEmailDTO } from '../types';

export const useVerifyEmail = () => {
  const form = useForm<VerifyEmailDTO>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'onChange',
    defaultValues: {
      verificationCode: '',
    },
  });

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    console.log(data);
  }

  const isButtonDisabled = !form.formState.isValid;
  return {
    form,
    onSubmit,
    isButtonDisabled,
  };
};
