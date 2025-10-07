import { rootRoute } from '@/core/router/rootRoute';
import { createRoute } from '@tanstack/react-router';
import { LandingPage } from '../components';

export const landingPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <LandingPage />,
});
