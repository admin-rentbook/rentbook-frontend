import { rootRoute } from '@/core/router/rootRoute';
import { sidebarItems } from '@/features/property-owners/constants';
import { LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { Complex, PropertyDetails } from '../components';
import { PropertyDetailsLinks } from '../constants';

const propertyDetailsSearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
  listingId: z.number().int().min(1).optional(),
  showListingLiveModal: z.boolean().optional(),
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

const complexViewSearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
  complexName: z.string().optional(),
  complexId: z.number().int().min(1).optional(),
});

export const complexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: PropertyDetailsLinks.COMPLEX_VIEW,
  validateSearch: complexViewSearchSchema,
  component: () => (
    <LayoutWithoutHeader sidebarItems={sidebarItems}>
      <Complex />
    </LayoutWithoutHeader>
  ),
});
