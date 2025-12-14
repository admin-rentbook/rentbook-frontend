import { rootRoute } from '@/core/router/rootRoute';
import {
  landingPageSidebarItems,
  Links,
} from '@/features/landing-page/constants';
import { LayoutWithFooter } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import { MyInterests } from './MyInterests';

export const myInterestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.MY_INTERESTS,
  component: () => (
    <LayoutWithFooter
      sidebarItems={landingPageSidebarItems}
      showHeaderText="My Interests"
    >
      <MyInterests />
    </LayoutWithFooter>
  ),
});
