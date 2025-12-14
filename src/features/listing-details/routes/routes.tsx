import { rootRoute } from '@/core/router/rootRoute';
import { landingPageSidebarItems } from '@/features/landing-page/constants';
import { LayoutWithFooter } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import { ListingDetailsLinks } from '../constants';
import { ListingDetailsView } from './listing-details';

export const listingDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ListingDetailsLinks.LISTING_DETAILS,
  component: () => (
    <LayoutWithFooter sidebarItems={landingPageSidebarItems}>
      <ListingDetailsView />
    </LayoutWithFooter>
  ),
});
