import { Button } from '@/shared/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Home01Icon } from 'hugeicons-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8">
          <Button
            onClick={() => navigate({ to: '/' })}
            size="lg"
            className="gap-2"
          >
            <Home01Icon size={20} />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};