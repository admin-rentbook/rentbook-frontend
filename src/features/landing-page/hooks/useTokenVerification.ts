import { useSearch, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useVerifyToken } from '../apis';

export const useTokenVerification = () => {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as {
    token?: string;
  };

  const verifyTokenMutation = useVerifyToken();
  const hasVerified = useRef(false);

  useEffect(() => {
    const token = searchParams.token;

    // Only verify once and if token exists
    if (token && !hasVerified.current && !verifyTokenMutation.isPending) {
      hasVerified.current = true;

      // Call the verify token endpoint
      verifyTokenMutation.mutate(token, {
        onSettled: () => {
          // Remove token from URL after verification (success or error)
          navigate({
            to: '/',
            search: {} as any,
            replace: true,
          });
        },
      });
    }
  }, [searchParams.token]);

  return {
    isVerifying: verifyTokenMutation.isPending,
    verificationError: verifyTokenMutation.error,
    verificationData: verifyTokenMutation.data,
  };
};