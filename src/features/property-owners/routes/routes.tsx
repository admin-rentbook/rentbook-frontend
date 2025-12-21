import { rootRoute } from '@/core/router/rootRoute';
import { Layout, LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { Property } from '../components';
import { Links, sidebarItems } from '../constants';
import { CreatePropertyView } from './create-property';
import { GetStartedView } from './get-started';
import { Overview } from './overview';

export const getStartedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.PROPERTY_GET_STARTED,
  component: () => <GetStartedView />,
});

export const propertyOverviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.OVERVIEW,
  component: () => (
    <Layout sidebarItems={sidebarItems}>
      <Overview />
    </Layout>
  ),
});

export const propertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.PROPERTIES,
  component: () => (
    <LayoutWithoutHeader sidebarItems={sidebarItems}>
      <Property />
    </LayoutWithoutHeader>
  ),
});

const createPropertySearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
});
export const createPropertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.CREATE_PROPERTY,
  validateSearch: createPropertySearchSchema,
  component: () => <CreatePropertyView />,
});
export const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.CALENDAR,
  component: () => <div>Calendar Page - Coming Soon</div>,
});

export const notificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.NOTIFICATIONS,
  component: () => <div>Messages Page - Coming Soon</div>,
});

export const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.MESSAGES,
  component: () => <div>Messages Page - Coming Soon</div>,
});

export const leasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.LEASES,
  component: () => <div>Leases Page - Coming Soon</div>,
});

export const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.PAYMENT,
  component: () => <div>Payment Page - Coming Soon</div>,
});

export const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.SUPPORT,
  component: () => <div>Support Page - Coming Soon</div>,
});

export const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.SETTINGS,
  component: () => <div>Settings Page - Coming Soon</div>,
});
