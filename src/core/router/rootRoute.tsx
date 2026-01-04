import { TokenExpiredModal } from '@/shared/components/TokenExpiredModal';
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';
import { useAppStore } from '../store';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/listing-details'];

export const rootRoute = createRootRoute({
  beforeLoad: ({ location }) => {
    const authUser = useAppStore.getState().authUser;
    const isAuthenticated = !!authUser?.tokens.access;

    // Allow access to public routes without authentication
    if (PUBLIC_ROUTES.includes(location.pathname)) {
      return;
    }

    if (!isAuthenticated) {
      throw redirect({
        to: '/',
        search: {
          redirectTo: location.href,
        },
      });
    }
  },

  component: () => (
    <>
      <TokenExpiredModal />
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster position="top-center" richColors closeButton />
    </>
  ),
});
