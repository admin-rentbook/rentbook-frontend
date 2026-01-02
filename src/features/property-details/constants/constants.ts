import { convertUnderscoreToSpace } from '@/shared/utils';

export const PropertyDetailsLinks = {
  PROPERTY_DETAILS: '/property-details',
  COMPLEX_VIEW: '/property-details/complex/$complexId',
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
