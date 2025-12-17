import { env } from '@/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { useGoogleAuth, useLoginMutation } from '../api/request';
import { loginSchema } from '../constants';
import type { LoginDTO } from '../types';

export const useLogin = () => {
  const navigate = useNavigate({ from: '/' });
  const search = useSearch({ from: '/' });

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

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
    {
      client_id: env.GOOGLE_AUTH_API_KEY,
      redirect_uri: env.REDIRECT_URL,
      response_type: 'id_token',
      scope: 'email profile openid',
      nonce: crypto.randomUUID(),
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
    //get the id_token from the hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');
    const error = params.get('error');

    if (error) {
      toast.error('Google sign-in failed. Please try again.', {
        id: 'google-auth-error',
      });
      window.location.hash = '';
      navigate({ to: '/', replace: true });
      return;
    }

    if (idToken) {
      googleAuthMutation.mutate(idToken);
      //Clean up the URL
      window.location.hash = '';
      navigate({ to: search.redirectTo ?? '/', replace: true });
    }
  }, [navigate, googleAuthMutation]);

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
