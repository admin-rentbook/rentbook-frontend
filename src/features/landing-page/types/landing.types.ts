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

export type PropertyAddress = {
  street: string;
  city: string;
  state: string;
  formatted_address: string;
};

export type PrimaryImage = {
  id: number;
  file_url: string;
  thumb_small: string;
  thumb_medium: string;
  thumb_large: string;
};

export type WishlistItem = {
  created_at: string;
  id: number;
  listing_type: string;
  property_address: PropertyAddress;
  title: string;
  wishlisted_at: string;
  beds: number;
  bathrooms: number;
  size_sqft: string;
  is_available: boolean;
  availability_date: string;
  status: string;
  primary_image?: PrimaryImage;
};

export type WaitlistItem = {
  created_at: string;
  id: number;
  listing_type: string;
  property_address: PropertyAddress;
  title: string;
  beds: number;
  bathrooms: number;
  size_sqft: string;
  is_available: boolean;
  availability_date: string;
  status: string;
  primary_image?: PrimaryImage;
};

export type ListingFilters = {
  listing_type?: string;
  max_price?: number;
  min_price?: number;
  ordering?: string;
  beds?: number;
  bathrooms?: number;
  search?: string;
  status?: string;
};

/**
 * API Response type for listing summary (matches actual API response)
 */
export type ApiListingSummary = {
  id: number;
  title: string;
  listing_type: string;
  description: string;
  beds: number;
  bathrooms: number;
  size_sqft: string;
  is_available: boolean;
  availability_date: string;
  property: {
    id: number;
    property_name: string;
    approval_status: string;
  };
  complex: any;
  price: string;
  status: string;
  primary_image?: {
    id: number;
    file_url: string;
    thumb_small: string;
    thumb_medium: string;
    thumb_large: string;
  };
};

/**
 * API Paginated Response
 */
export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
