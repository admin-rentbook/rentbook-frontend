import { useAppStore } from '@/core/store';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import type { AxiosError } from 'axios';
import { ReloadIcon } from 'hugeicons-react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  // Safely get isTokenExpired with fallback to prevent invariant errors during logout
  const isTokenExpired = useAppStore((s) => s?.isTokenExpired ?? false);

  const is401Error = (error as AxiosError)?.response?.status === 401;

  const isUnauthorizedMessage = error?.message?.includes('Unauthorized') ||
                                 error?.message?.includes('Please login again');

  if (!error || isTokenExpired || is401Error || isUnauthorizedMessage) return null;
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="mt-2">
        {error?.message || 'Failed to load content'}
      </AlertDescription>
      {onRetry && (
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-4"
          >
            <ReloadIcon />
            Try Again
          </Button>
        </div>
      )}
    </Alert>
  );
};
