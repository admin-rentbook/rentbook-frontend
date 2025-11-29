import { landingPageRoute } from '@/features/landing-page';
import { listingGetStartedRoute, listingsRoute } from '@/features/listings';
import {
  calendarRoute,
  createPropertyRoute,
  getStartedRoute,
  leasesRoute,
  messagesRoute,
  notificationRoute,
  paymentRoute,
  propertiesRoute,
  propertyOverviewRoute,
  settingsRoute,
  supportRoute,
} from '@/features/property-owners';
import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';

const routeTree = rootRoute.addChildren([
  landingPageRoute,
  propertyOverviewRoute,
  calendarRoute,
  messagesRoute,
  propertiesRoute,
  leasesRoute,
  paymentRoute,
  supportRoute,
  notificationRoute,
  settingsRoute,
  createPropertyRoute,
  getStartedRoute,
  listingGetStartedRoute,
  listingsRoute,
]); //this will be updated properly by putting them in their correct features
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
