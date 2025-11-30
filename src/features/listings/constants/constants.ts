import { convertUnderscoreToSpace } from './../../../shared/utils/stringUtils';
export const ListingLinks = {
  LISTINGS_GET_STARTED: '/listings/get-started',
  LISTINGS: '/listings-start',
} as const;
export type ListingLinkType = (typeof ListingLinks)[keyof typeof ListingLinks];

export const ListingTypes = {
  HOUSE: 'HOUSE',
  APARTMENT: 'APARTMENT',
  TOWNHOUSE: 'TOWNHOUSE',
};
export type ListingType = (typeof ListingTypes)[keyof typeof ListingTypes];
export const listingTypeOptions = Object.values(ListingTypes).map(
  (listing) => ({
    label: convertUnderscoreToSpace(listing),
    value: listing,
  })
);
