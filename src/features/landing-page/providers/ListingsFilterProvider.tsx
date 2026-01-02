import { createContext, useContext, type ReactNode } from 'react';
import { useListings } from '../hooks';

type ListingsFilterContextType = ReturnType<typeof useListings>;

const ListingsFilterContext = createContext<ListingsFilterContextType | undefined>(
  undefined
);

export const ListingsFilterProvider = ({ children }: { children: ReactNode }) => {
  const listingsData = useListings();

  return (
    <ListingsFilterContext.Provider value={listingsData}>
      {children}
    </ListingsFilterContext.Provider>
  );
};

export const useListingsFilter = () => {
  const context = useContext(ListingsFilterContext);
  if (!context) {
    throw new Error('useListingsFilter must be used within ListingsFilterProvider');
  }
  return context;
};
