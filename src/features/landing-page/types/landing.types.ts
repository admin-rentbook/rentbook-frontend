import type { ListingSummaryDTO } from '@/features/listings/types';

export type PropertyType = 'apartment' | 'house' | 'townhouse' | null;

export type SearchFilters = {
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  priceRange: [number, number];
};

export type PaginatedListingsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListingSummaryDTO[];
};
