import { rootRoute } from '@/core/router/rootRoute';
import { LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { Kyc, Property } from '../components';
import { Links, sidebarItems } from '../constants';
import { CreatePropertyView } from './create-property';
import { EditPropertyView } from './edit-property';
import { GetStartedView } from './get-started';
import { OverviewView } from './overview';

export const getStartedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.PROPERTY_GET_STARTED,
  component: () => <GetStartedView />,
});

const overviewSearchSchema = z.object({
  kycSubmitted: z.boolean().optional(),
});

export const propertyOverviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.OVERVIEW,
  validateSearch: overviewSearchSchema,
  component: () => (
    <LayoutWithoutHeader sidebarItems={sidebarItems}>
      <OverviewView />
    </LayoutWithoutHeader>
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

const editPropertySearchSchema = z.object({
  propertyId: z.number().int().min(1),
});
export const editPropertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.EDIT_PROPERTY,
  validateSearch: editPropertySearchSchema,
  component: () => <EditPropertyView />,
});

export const kycRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.KYC,
  component: () => <Kyc />,
});

export const notificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Links.NOTIFICATIONS,
  component: () => <div>Notifications Page - Coming Soon</div>,
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
