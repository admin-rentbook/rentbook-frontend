import { useMemo, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useGetAllListings, type ListingFilters } from '../apis';
import type { SearchFilters } from '../types';

const ITEMS_PER_PAGE = 12;
const DEBOUNCE_DELAY = 2000; // 2 seconds

export const useListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({
    propertyType: null,
    bedrooms: 0,
    bathrooms: 0,
    priceRange: [0, 10000],
  });

  // Debounce bedrooms, bathrooms, and price range (2 second delay)
  const debouncedBedrooms = useDebounce(filters.bedrooms, DEBOUNCE_DELAY);
  const debouncedBathrooms = useDebounce(filters.bathrooms, DEBOUNCE_DELAY);
  const debouncedPriceRange = useDebounce(filters.priceRange, DEBOUNCE_DELAY);

  // Property type is NOT debounced (immediate response)
  const propertyType = filters.propertyType;

  // Convert SearchFilters to ListingFilters (API format)
  const apiFilters = useMemo<ListingFilters | undefined>(() => {
    const params: ListingFilters = {};

    if (propertyType) {
      params.listing_type = propertyType;
    }

    // Always send both min_price and max_price together for price range filtering
    const [minPrice, maxPrice] = debouncedPriceRange;
    const defaultMinPrice = 0;
    const defaultMaxPrice = 10000;

    // Only add price filters if the range has changed from default
    if (minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice) {
      params.min_price = minPrice;
      params.max_price = maxPrice;
    }

    if (debouncedBedrooms > 0) {
      params.beds = debouncedBedrooms;
    }

    if (debouncedBathrooms > 0) {
      params.bathrooms = debouncedBathrooms;
    }

    // Only return filters if there are any active filters
    return Object.keys(params).length > 0 ? params : undefined;
  }, [propertyType, debouncedBedrooms, debouncedBathrooms, debouncedPriceRange]);

  const {
    data: listingsData,
    isLoading,
    error,
    refetch,
  } = useGetAllListings(currentPage, ITEMS_PER_PAGE, apiFilters);

  // Get listings from API response
  const listings = useMemo(() => {
    // Handle both array response and paginated response
    const results = Array.isArray(listingsData)
      ? listingsData
      : listingsData?.results || [];

    return results || [];
  }, [listingsData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      propertyType: null,
      bedrooms: 0,
      bathrooms: 0,
      priceRange: [0, 10000],
    });
    setCurrentPage(1);
  };

  // Calculate total count based on response structure
  const totalCount = Array.isArray(listingsData)
    ? listingsData.length
    : listingsData?.count || 0;

  // Check if any filters are active (different from defaults)
  const hasActiveFilters = useMemo(() => {
    return (
      filters.propertyType !== null ||
      filters.bedrooms > 0 ||
      filters.bathrooms > 0 ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 10000
    );
  }, [filters]);

  return {
    listings,
    isLoading,
    error,
    currentPage,
    totalPages: 0, // API doesn't return total_pages, calculate from count
    totalCount,
    handlePageChange,
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
    refetch,
  };
};