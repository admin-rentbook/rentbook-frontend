import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import { landingPageRoute } from '@/features/landing-page';

const routeTree = rootRoute.addChildren([landingPageRoute]);
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
