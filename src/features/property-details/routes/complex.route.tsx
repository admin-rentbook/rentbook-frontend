import { rootRoute } from '@/core/router/rootRoute';
import { sidebarItems } from '@/features/property-owners/constants';
import { LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { Complex } from '../components';
import { PropertyDetailsLinks } from '../constants';

const complexViewSearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
  complexName: z.string().optional(),
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