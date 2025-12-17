import type { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import type { PropertyFilters } from '../types';

export const usePropertyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<PropertyFilters>({
    status: null,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

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
  };
};
