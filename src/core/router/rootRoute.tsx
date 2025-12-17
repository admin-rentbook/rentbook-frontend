import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';
import { useAppStore } from '../store';

export const rootRoute = createRootRoute({
  beforeLoad: ({ location }) => {
    const authUser = useAppStore.getState().authUser;
    const isAuthenticated = !!authUser?.tokens.access;

    if (location.pathname === '/') {
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
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster position="top-center" richColors closeButton />
    </>
  ),
});
