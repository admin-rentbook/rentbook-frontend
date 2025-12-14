export const ListingDetailsLinks = {
  LISTING_DETAILS: '/listing-details',
} as const;
export type ListingDetailsLinkType =
  (typeof ListingDetailsLinks)[keyof typeof ListingDetailsLinks];
