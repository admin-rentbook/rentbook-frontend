import { convertUnderscoreToSpace } from '@/shared/utils';

export const PropertyDetailsLinks = {
  PROPERTY_DETAILS: '/property-details',
  COMPLEX_VIEW: '/property-details/complex/$complexId',
  AGENT_LISTINGS: '/property-details/agent-listings',
} as const;
export type PropertyDetailsLinkType =
  (typeof PropertyDetailsLinks)[keyof typeof PropertyDetailsLinks];

export const LISTING_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  DRAFT: 'draft',
} as const;

export const listingStatusOptions = Object.values(LISTING_STATUS).map(
  (status) => ({
    label: convertUnderscoreToSpace(status),
    value: status,
  })
);

export const AGENT_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  INACTIVE: 'inactive',
} as const;

export const agentStatusOptions = Object.values(AGENT_STATUS).map(
  (status) => ({
    label: convertUnderscoreToSpace(status),
    value: status,
  })
);
