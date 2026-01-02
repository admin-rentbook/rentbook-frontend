import { env } from '@/config';

export const url = {
  publicListing: (listingId: number) =>
    `${env.API_BASE_URL}/listing/listings/public/${listingId}/`,
};

export const queryKey = {
  all: ['listing-details'] as const,
  publicListing: (listingId: number) =>
    [...queryKey.all, 'public', listingId] as const,
};
