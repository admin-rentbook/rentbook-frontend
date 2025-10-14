import { rootRoute } from '@/core/router/rootRoute';
import { createRoute } from '@tanstack/react-router';
import { Links } from '../constants';
import { Layout } from '../Layout';
import { Overview } from './overview';

export const propertyOverviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.OVERVIEW,
  component: () => (
    <Layout>
      <Overview />
    </Layout>
  ),
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

export const propertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.PROPERTIES,
  component: () => <div>Properties Page - Coming Soon</div>,
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
