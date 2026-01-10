import { landingPageRoute } from '@/features/landing-page';
import { listingDetailsRoute } from '@/features/listing-details';
import { listingGetStartedRoute, listingsRoute, listingsEditRoute } from '@/features/listings';
import { viewListingRoute } from '@/features/owner-listing-details';
import { agentListingsRoute, complexRoute, propertyDetailsRoute } from '@/features/property-details';
import {
  createPropertyRoute,
  editPropertyRoute,
  getStartedRoute,
  kycRoute,
  leasesRoute,
  notificationRoute,
  paymentRoute,
  propertiesRoute,
  propertyOverviewRoute,
  settingsRoute,
  supportRoute,
} from '@/features/property-owners';
import { viewingRoute } from '@/features/viewing';
import { myInterestRoute } from '@/features/wait-wish-lists';
import type { PropertyDTO } from '@/shared/types';
import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';

const routeTree = rootRoute.addChildren([
  landingPageRoute,
  propertyOverviewRoute,
  propertiesRoute,
  leasesRoute,
  paymentRoute,
  supportRoute,
  notificationRoute,
  settingsRoute,
  createPropertyRoute,
  editPropertyRoute,
  getStartedRoute,
  listingGetStartedRoute,
  listingsRoute,
  listingsEditRoute,
  listingDetailsRoute,
  myInterestRoute,
  propertyDetailsRoute,
  complexRoute,
  agentListingsRoute,
  viewingRoute,
  viewListingRoute,
  kycRoute,
]); //this will be updated properly by putting them in their correct features
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    property?: PropertyDTO;
  }
}

export default router;
