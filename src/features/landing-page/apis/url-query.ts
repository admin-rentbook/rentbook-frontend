import { env } from '@/config';

export const url = {
  allListings: `${env.API_BASE_URL}/listing/listings/`,
  waitlist: (listingId: number) => `${env.API_BASE_URL}/waitlist/listings/${listingId}/waitlist/`,
  userWaitlists: `${env.API_BASE_URL}/waitlist/user/waitlists/`,
  wishlist: (listingId: number) => `${env.API_BASE_URL}/wishlist/listings/${listingId}/`,
  wishlists: `${env.API_BASE_URL}/wishlist/`,
  verifyToken: (token: string) => `${env.API_BASE_URL}/properties/verify/${token}/`,
};

export const queryKey = {
  all: ['landing-listings'] as const,
  allListings: (currentPage: number, pageSize: number) =>
    [...queryKey.all, currentPage, pageSize] as const,
  waitlist: ['waitlist'] as const,
  userWaitlists: () => [...queryKey.waitlist, 'user'] as const,
  wishlist: ['wishlist'] as const,
  wishlists: (page: number, pageSize: number) =>
    [...queryKey.wishlist, page, pageSize] as const,
};
