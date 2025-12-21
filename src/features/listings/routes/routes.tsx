import { rootRoute } from '@/core/router/rootRoute';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { Listings } from '../components';
import { ListingLinks } from '../constants';
import { ListingDraftProvider } from '../providers';
import { ListingGetStartedView } from './listing-get-started';

const listingPageSearchSchema = z.object({
  blockName: z.string().optional(),
  propertyId: z.number().int().min(1).optional(),
  listingId: z.number().int().min(1).optional(),
});

const listingGetStartedSearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
});
export const listingGetStartedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ListingLinks.LISTINGS_GET_STARTED,
  validateSearch: listingGetStartedSearchSchema,
  component: () => <ListingGetStartedView />,
});

export const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ListingLinks.LISTINGS,
  validateSearch: listingPageSearchSchema,
  component: () => (
    <ListingDraftProvider>
      <Listings />
    </ListingDraftProvider>
  ),
});
