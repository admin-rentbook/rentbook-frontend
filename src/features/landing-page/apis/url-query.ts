import { env } from '@/config';

export const url = {
  allListings: `${env.API_BASE_URL}/listing/listings/`,
};

export const queryKey = {
  all: ['landing-listings'] as const,
  allListings: (currentPage: number, pageSize: number) =>
    [...queryKey.all, currentPage, pageSize] as const,
};
