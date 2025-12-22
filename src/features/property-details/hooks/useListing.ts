import type { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
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
};
export const useListing = () => {
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
  };
};
