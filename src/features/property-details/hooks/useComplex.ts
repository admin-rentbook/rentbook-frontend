import { useGetComplexes } from '@/features/listings/apis';
import type { ComplexDTO, ListingDescriptionDTO } from '@/features/listings/types';
import type { PaginationState } from '@tanstack/react-table';
import { useSearch } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { PropertyDetailsLinks } from '../constants';
import type { ListingFilters } from '../types';

export type UseComplex = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;
  reset: () => void;
  filters: ListingFilters;
  setFilters: React.Dispatch<React.SetStateAction<ListingFilters>>;
  complexData: ComplexDTO | undefined;
  listings: ListingDescriptionDTO[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
};

export const useComplex = () => {
  const { complexId } = useSearch({
    from: PropertyDetailsLinks.COMPLEX_VIEW,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ListingFilters>({
    status: null,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  // Fetch all complexes
  const {
    data: complexesData,
    isPending,
    isFetching,
    error,
    isError,
  } = useGetComplexes();

  // Find the specific complex by ID
  const complexData = useMemo(() => {
    if (!complexesData?.data || !complexId) return undefined;
    return complexesData.data.find((c) => c.id === Number(complexId));
  }, [complexesData, complexId]);

  // Get listings for this complex
  const listings = useMemo(() => {
    return complexData?.listings || [];
  }, [complexData]);

  const reset = () => {
    setSearchTerm('');
    setFilters({ status: null });
    setPagination({ pageIndex: 1, pageSize: 10 });
  };

  return {
    searchTerm,
    setSearchTerm,
    setPagination,
    pagination,
    reset,
    filters,
    setFilters,
    complexData,
    listings,
    isLoading: isPending,
    isFetching,
    isError,
    error,
  };
};