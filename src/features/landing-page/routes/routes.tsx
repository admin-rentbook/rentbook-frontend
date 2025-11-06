import { rootRoute } from '@/core/router/rootRoute';
import { Layout } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import { LandingPage } from '../components';
import { landingPageSidebarItems } from '../constants';

export const landingPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Layout sidebarItems={landingPageSidebarItems}>
      <LandingPage />
    </Layout>
  ),
});
