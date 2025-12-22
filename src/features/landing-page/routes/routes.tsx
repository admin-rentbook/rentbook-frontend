import { rootRoute } from '@/core/router/rootRoute';
import { Layout } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import { LandingPage } from '../components';
import { landingPageSidebarItems } from '../constants';
import z from 'zod';

const landingPageSearchSchema = z.object({
  step: z.number().int().min(1).default(1),
  email: z.email().min(1).optional(),
  redirectTo: z.string().optional()
});

export const landingPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: landingPageSearchSchema,
  component: () => (
    <Layout sidebarItems={landingPageSidebarItems}>
      <LandingPage />
    </Layout>
  ),
});
