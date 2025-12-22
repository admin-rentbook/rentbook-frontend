import { env } from '@/config';

export const url = {
  addListingDescription: `${env.API_BASE_URL}/listing/properties/`,
  listing: `${env.API_BASE_URL}/listing/listings`,
  properties: `${env.API_BASE_URL}/listing/properties`,
  createComplex: `${env.API_BASE_URL}/properties`,
};

export const queryKey = {
  all: ['listings'] as const,
  getAllListings: (propertyId: number) => [...queryKey.all, propertyId],
  listingDescription: (id: number) =>
    [...queryKey.all, id, 'listing_description'] as const,
  amenities: (id: number) => [...queryKey.all, id, 'amenities'] as const,
  complexes: (propertyId: number) =>
    [...queryKey.all, propertyId, 'complexes'] as const,
};
