import type { PaginationState } from '@tanstack/react-table';
import { create } from 'zustand';

type PropertyState = {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  reset: () => void;
};

export const usePropertyStore = create<PropertyState>((set) => ({
  searchTerm: '',
  setSearchTerm: (s) => set({ searchTerm: s }),
  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (value) =>
    typeof value === 'function'
      ? set((s) => ({
          pagination: (value as (prev: PaginationState) => PaginationState)(
            s.pagination
          ),
        }))
      : set({ pagination: value }),
  reset: () =>
    set({
      searchTerm: '',
      pagination: { pageIndex: 0, pageSize: 10 },
    }),
}));
