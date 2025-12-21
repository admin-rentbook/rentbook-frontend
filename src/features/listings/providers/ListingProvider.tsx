import type { StepProgress } from '@/shared/types';
import {
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import { createContext, useContext, useRef, type ReactNode } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';
import type { ListingDescriptionDTO } from '../types';

type ListingStoreProviderProps = {
  children: ReactNode;
};
type ListingState = {
  currentMainStep: number;
  currentSubStep:  number | Record<number, number>;
  completedSteps: Record<string, boolean>;

  updateProgress: (progress: Partial<StepProgress>) => void;
  completeStep: (mainStepId: number, subStepId: number) => void;
  resetListing: () => void;

  listingDescriptionData: ListingDescriptionDTO | null;
  setListingDescription: (data: ListingDescriptionDTO) => void;
};

type ListingStore = ReturnType<typeof createListingStore>;

const getInitialListingState = () => {
  const storedListingDescription =
    getDataFromSessStorage<ListingDescriptionDTO | null>('LISTING_DESCRIPTION');
  const storedProgress =
    getDataFromSessStorage<StepProgress>('LISTING_PROGRESS');
  return {
    listingDescriptionData: storedListingDescription,
    currentMainStep: storedProgress?.currentMainStep ?? 0,
    currentSubStep: storedProgress?.currentSubStep ?? 0,
    completedSteps: storedProgress?.completedSteps ?? {},
  };
};

const createListingStore = (): StoreApi<ListingState> => {
  const initialState = getInitialListingState();

  return createStore<ListingState>((set) => ({
    currentMainStep: initialState.currentMainStep,
    currentSubStep: initialState.currentSubStep,
    completedSteps: initialState.completedSteps,
    listingDescriptionData: initialState.listingDescriptionData,
    setListingDescription: (data) => {
      set((state) => {
        const updatedData = {
          ...state.listingDescriptionData,
          ...data,
        };
        saveDataToSessStorage('LISTING_DESCRIPTION', updatedData);
        return {
          listingDescriptionData: updatedData,
        };
      });
    },
    updateProgress: (progress) => {
      set((state) => {
        const updatedProgress = {
          currentMainStep: progress.currentMainStep ?? state.currentMainStep,
          currentSubStep: progress.currentSubStep ?? state.currentSubStep,
          completedSteps: progress.completedSteps ?? state.completedSteps,
        };

        // Save progress to session storage
        saveDataToSessStorage('LISTING_PROGRESS', updatedProgress);

        return updatedProgress;
      });
    },
    completeStep: (mainStepId, subStepId) => {
      set((state) => {
        const updatedCompletedSteps = {
          ...state.completedSteps,
          [`${mainStepId}-${subStepId}`]: true,
        };

        // Save progress to session storage
        const progress = {
          currentMainStep: state.currentMainStep,
          currentSubStep: state.currentSubStep,
          completedSteps: updatedCompletedSteps,
        };
        saveDataToSessStorage('LISTING_PROGRESS', progress);

        return {
          completedSteps: updatedCompletedSteps,
        };
      });
    },
    resetListing: () => {
      sessionStorage.removeItem('LISTING_DESCRIPTION');
      sessionStorage.removeItem('AMENITIES');
      sessionStorage.removeItem('LISTING_PROGRESS');

      set({
        currentMainStep: 0,
        currentSubStep: 0,
        completedSteps: {},
        listingDescriptionData: null,
      });
    },
  }));
};
const AuthStoreContext = createContext<ListingStore | null>(null);

export const ListingStoreProvider = ({
  children,
}: ListingStoreProviderProps) => {
  const storeRef = useRef<ListingStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createListingStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useListingStore = <T,>(selector: (state: ListingState) => T) => {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error('useListingStore must be used within ListingStoreProvider');
  }
  return useStore(store, selector);
};
