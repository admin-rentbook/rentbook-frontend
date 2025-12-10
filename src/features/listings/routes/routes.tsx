import { rootRoute } from '@/core/router/rootRoute';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { Listings } from '../components';
import { ListingLinks } from '../constants';
import { ListingDraftProvider } from '../providers';
import { ListingGetStartedView } from './listing-get-started';

const listingPageSearchSchema = z.object({
  blockName: z.string().optional(),
});

export const listingGetStartedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ListingLinks.LISTINGS_GET_STARTED,
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
