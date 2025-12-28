import { rootRoute } from '@/core/router/rootRoute';
import { sidebarItems } from '@/features/property-owners/constants';
import { LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { PropertyDetails } from '../components';
import { PropertyDetailsLinks } from '../constants';

const propertyDetailsSearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
  propertyName: z.string().optional(),
  propertyCity: z.string().optional(),
  propertyStreet: z.string().optional(),
  propertyStatus: z.string().optional(),
  // For showing listing live modal after publishing
  showListingLiveModal: z.boolean().optional(),
  listingId: z.number().int().min(1).optional(),
});
export const propertyDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: PropertyDetailsLinks.PROPERTY_DETAILS,
  validateSearch: propertyDetailsSearchSchema,
  component: () => (
    <LayoutWithoutHeader sidebarItems={sidebarItems}>
      <PropertyDetails />
    </LayoutWithoutHeader>
  ),
});
