import { rootRoute } from '@/core/router/rootRoute';
import { sidebarItems } from '@/features/property-owners/constants';
import { LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { ViewListingLinks } from '../constants';
import { ViewingListingView } from './view-listing';

const viewListingSearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
  listingId: z.number().int().min(1).optional(),
});

export const viewListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ViewListingLinks.VIEW_A_LISTING,
  validateSearch: viewListingSearchSchema,
  component: () => (
    <LayoutWithoutHeader sidebarItems={sidebarItems}>
      <ViewingListingView />
    </LayoutWithoutHeader>
  ),
});
