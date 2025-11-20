import { env } from '@/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { useGoogleAuth, useLoginMutation } from '../api/request';
import { loginSchema } from '../constants';
import type { LoginDTO } from '../types';

export const useLogin = () => {
  const navigate = useNavigate({ from: '/' });
  const loginMutation = useLoginMutation();
  const googleAuthMutation = useGoogleAuth();

  const form = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const nonce = crypto.randomUUID();

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
    {
      client_id: env.GOOGLE_AUTH_API_KEY,
      redirect_uri: `${env.REDIRECT_URL}`,
      response_type: 'id_token',
      scope: 'email profile openid',
      access_type: 'offline',
      nonce,
      prompt: 'select_account',
    }
  )}`;

  function onSubmit(data: z.infer<typeof loginSchema>) {
    loginMutation.mutate(data);
  }

  const handleForgotPassword = () => {
    navigate({
      to: '/',
      search: { step: 3 },
      replace: true,
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      toast.error('Google sign-in failed. Please try again.', {
        id: 'google-auth-error',
      });

      navigate({ to: '/', replace: true });
      return;
    }

    if (code) {
      console.log('Got authorization code:', code);

      googleAuthMutation.mutate(code as string);
    }
  }, []);

  const isButtonDisabled = !form.formState.isValid || loginMutation.isPending;
  return {
    form,
    onSubmit,
    isButtonDisabled,
    handleForgotPassword,
    isLoading: loginMutation.isPending,
    isGoogleAuthLoading: googleAuthMutation.isPending,
    googleAuthUrl,
  };
};
