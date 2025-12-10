import { createContext, useContext, type ReactNode } from 'react';
import { useListingDraftState } from '../hooks/useListingDraftState';

type ListingDraftContextType = ReturnType<typeof useListingDraftState>;

const ListingDraftContext = createContext<ListingDraftContextType | null>(null);

export const useListingDraft = () => {
  const context = useContext(ListingDraftContext);
  if (!context) {
    throw new Error('useListingDraft must be used within ListingDraftProvider');
  }
  return context;
};

export const ListingDraftProvider = ({ children }: { children: ReactNode }) => {
  const draftState = useListingDraftState();

  if (draftState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading draft...</p>
      </div>
    );
  }

  return (
    <ListingDraftContext.Provider value={draftState}>
      {children}
    </ListingDraftContext.Provider>
  );
};
