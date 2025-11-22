import { env } from '@/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { useGoogleAuth, useSignupMutation } from '../api/request';
import { signupSchema } from '../constants';
import type { SignupDTO } from '../types';

export const useSignup = () => {
  const navigate = useNavigate({ from: '/' });
  const signupMutation = useSignupMutation();
  const googleAuthMutation = useGoogleAuth();
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
      navigate({ to: '/', replace: true });
    }
  }, [navigate, googleAuthMutation]);
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
    isGoogleAuthLoading: googleAuthMutation.isPending,
    googleAuthUrl,
  };
};
