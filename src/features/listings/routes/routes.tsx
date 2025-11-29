import { rootRoute } from '@/core/router/rootRoute';
import { createRoute } from '@tanstack/react-router';
import { Listings } from '../components';
import { ListingLinks } from '../constants';
import { ListingGetStartedView } from './listing-get-started';
import z from 'zod';

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
  component: () => <Listings />,
});
