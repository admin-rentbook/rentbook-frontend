import { env } from '@/config';

export const url = {
  addListingDescription: `${env.API_BASE_URL}/listing/properties/`,
  listing: `${env.API_BASE_URL}/listing/listings`,
  properties: `${env.API_BASE_URL}/listing/properties`,
  createComplex: `${env.API_BASE_URL}/properties`,
  getComplexes: `${env.API_BASE_URL}/listing/user/complexes/`,
};

export const queryKey = {
  all: ['listings'] as const,
  getAllListings: (propertyId: number) => [...queryKey.all, propertyId],
  listingDescription: (id: number) =>
    [...queryKey.all, id, 'listing_description'] as const,
  amenities: (id: number) => [...queryKey.all, id, 'amenities'] as const,
  getComplexes: () => [...queryKey.all, 'complexes'] as const,
  getMedia: (listingId: number) =>
    [...queryKey.all, listingId] as const,
  rentalPricing: (listingId: number) =>
    [...queryKey.all, listingId, 'rental_pricing'] as const,
  additionalFees: (listingId: number) =>
    [...queryKey.all, listingId, 'additional_fees'] as const,
  discount: (listingId: number) =>
    [...queryKey.all, listingId, 'discount'] as const,
  viewing: (listingId: number) =>
    [...queryKey.all, listingId, 'viewing'] as const,
  finalDetails: (listingId: number) =>
    [...queryKey.all, listingId, 'final_details'] as const,
  additionalDetails: (listingId: number) =>
    [...queryKey.all, listingId, 'additional_details'] as const,
  listingSummary: (listingId: number) =>
    [...queryKey.all, listingId, 'summary'] as const,
};
