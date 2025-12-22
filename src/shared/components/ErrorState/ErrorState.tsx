import { useAppStore } from '@/core/store';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { LogoutSquare01Icon, ReloadIcon } from 'hugeicons-react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  if (!error) return;
  const isAuthError =
    error.message.includes('Unauthorized') ||
    error.message.includes('Authentication');
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="mt-2">
        {error.message || 'Failed to load properties'}
      </AlertDescription>
      {onRetry && !isAuthError && (
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
      {isAuthError && (
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="mt-4"
          >
            <LogoutSquare01Icon />
            Go to Login
          </Button>
        </div>
      )}
    </Alert>
  );
};
