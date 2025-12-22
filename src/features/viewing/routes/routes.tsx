import { rootRoute } from '@/core/router/rootRoute';
import { Links, sidebarItems } from '@/features/property-owners/constants';
import { LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import { Viewing } from '../components';

export const viewingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.VIEWING,
  component: () => (
    <LayoutWithoutHeader sidebarItems={sidebarItems}>
      <Viewing />
    </LayoutWithoutHeader>
  ),
});
