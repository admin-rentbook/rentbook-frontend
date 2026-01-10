import type { ListingDescriptionDTO } from '@/features/listings';
import { useGetListsByPropsId } from '@/features/listings/apis';
import type { ApiResponse } from '@/shared/types';
import { useSearch } from '@tanstack/react-router';
import type { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { PropertyDetailsLinks } from '../constants';
import type { ListingFilters } from '../types';

export type UseAgentListings = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;
  reset: () => void;
  filters: ListingFilters;
  setFilters: React.Dispatch<React.SetStateAction<ListingFilters>>;
  listingData: ApiResponse<ListingDescriptionDTO[]> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
};

export const useAgentListings = (): UseAgentListings => {
  const { propertyId } = useSearch({
    from: PropertyDetailsLinks.AGENT_LISTINGS,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ListingFilters>({
    status: null,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  const {
    data: listingData,
    isPending: isLoading,
    isFetching,
    error,
    isError,
  } = useGetListsByPropsId(propertyId as number);

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
    listingData,
    isLoading,
    isFetching,
    isError,
    error,
  };
};
