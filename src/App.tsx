import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { APIProvider } from '@vis.gl/react-google-maps';
import { lazy, Suspense, useEffect, useState } from 'react';
import { env } from './config';
import { queryClient } from './core/lib';
import router from './core/router';

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

function App() {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  const handleQueryClient = queryClient;
  return (
    <APIProvider apiKey={env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <GoogleOAuthProvider clientId={env.GOOGLE_AUTH_API_KEY}>
        <QueryClientProvider client={handleQueryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {showDevtools && (
            <Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </Suspense>
          )}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </APIProvider>
  );
}

export default App;
