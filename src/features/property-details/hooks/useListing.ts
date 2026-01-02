import { useGetComplexes, useGetListsByPropsId } from '@/features/listings/apis';
import type { ComplexDTO, ListingDescriptionDTO } from '@/features/listings/types';
import type { ApiResponse } from '@/shared/types';
import type { PaginationState } from '@tanstack/react-table';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { PropertyDetailsLinks } from '../constants';
import type { DisplayOptions, ListingFilters } from '../types';

export type UseListing = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;
  reset: () => void;
  filters: ListingFilters;
  setFilters: React.Dispatch<React.SetStateAction<ListingFilters>>;
  displayOptions: DisplayOptions;
  setDisplayOptions: React.Dispatch<React.SetStateAction<DisplayOptions>>;
  listingData: ApiResponse<ListingDescriptionDTO[]> | undefined;
  complexData: ApiResponse<ComplexDTO[]> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
};

export const useListing = () => {
  const { propertyId } = useSearch({
    from: PropertyDetailsLinks.PROPERTY_DETAILS,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ListingFilters>({
    status: null,
  });

  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    viewType: 'list',
    grouping: null,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  // API call for listings
  const {
    data: listingData,
    isPending: isListingPending,
    isFetching: isListingFetching,
    error: listingError,
    isError: isListingError,
  } = useGetListsByPropsId(propertyId as number, {
    enabled: displayOptions.grouping === 'listings' || displayOptions.grouping === null,
  });

  // API call for complexes
  const {
    data: complexData,
    isPending: isComplexPending,
    isFetching: isComplexFetching,
    error: complexError,
    isError: isComplexError,
  } = useGetComplexes({
    enabled: displayOptions.grouping === 'complex',
  });

  const isLoading = displayOptions.grouping === 'complex' ? isComplexPending : isListingPending;
  const isFetching = displayOptions.grouping === 'complex' ? isComplexFetching : isListingFetching;
  const isError = displayOptions.grouping === 'complex' ? isComplexError : isListingError;
  const error = displayOptions.grouping === 'complex' ? complexError : listingError;

  const reset = () => {
    setSearchTerm('');
    setFilters({ status: null });
    setDisplayOptions({ viewType: 'list', grouping: null });
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
    displayOptions,
    setDisplayOptions,
    listingData,
    complexData,
    isLoading,
    isFetching,
    isError,
    error,
  };
};
