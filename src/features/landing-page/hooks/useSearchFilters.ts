import { useState, useCallback } from "react";
import type { PropertyType, SearchFilters } from "../types";

export const useSearchFilters = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    propertyType: null,
    bedrooms: 0,
    bathrooms: 0,
    priceRange: [0, 10000],
  });

  const setPropertyType = useCallback((type: PropertyType | null) => {
    setFilters(prev => ({ ...prev, propertyType: type }));
  }, []);

  const setBedrooms = useCallback((count: number) => {
    setFilters(prev => ({ ...prev, bedrooms: Math.max(0, count) }));
  }, []);

  const setBathrooms = useCallback((count: number) => {
    setFilters(prev => ({ ...prev, bathrooms: Math.max(0, count) }));
  }, []);

  const setPriceRange = useCallback((range: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      propertyType: null,
      bedrooms: 0,
      bathrooms: 0,
      priceRange: [0, 10000],
    });
  }, []);

  return {
    filters,
    setPropertyType,
    setBedrooms,
    setBathrooms,
    setPriceRange,
    resetFilters,
  };
}