import { rootRoute } from '@/core/router/rootRoute';
import { sidebarItems } from '@/features/property-owners/constants';
import { LayoutWithoutHeader } from '@/shared/components/Layout';
import { createRoute } from '@tanstack/react-router';
import z from 'zod';
import { AgentListings } from '../components/AgentListings';
import { PropertyDetailsLinks } from '../constants';

const agentListingsSearchSchema = z.object({
  propertyId: z.number().int().min(1).optional(),
  agentId: z.number().int().min(1).optional(),
});

export const agentListingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: PropertyDetailsLinks.AGENT_LISTINGS,
  validateSearch: agentListingsSearchSchema,
  component: () => (
    <LayoutWithoutHeader sidebarItems={sidebarItems}>
      <AgentListings />
    </LayoutWithoutHeader>
  ),
});