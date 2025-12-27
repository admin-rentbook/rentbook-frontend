import { Button } from '@/shared/components/ui/button';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>

          {isDev && error && (
            <div className="text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                Error Details (Development Only)
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Message:
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                    {error.message}
                  </p>
                </div>
                {error.stack && (
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      Stack Trace:
                    </p>
                    <pre className="text-xs text-red-700 dark:text-red-300 overflow-x-auto whitespace-pre-wrap font-mono mt-1">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button onClick={resetErrorBoundary} size="lg">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.href = '/';
      }}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}