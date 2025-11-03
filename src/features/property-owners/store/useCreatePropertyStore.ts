import {
  clearDataFromSessStorage,
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import { create } from 'zustand';
import { LISTING_TYPE } from '../constants';
import type { CreatePropertyData } from '../types/property';

type CreatePropertyState = {
  propertyData: Partial<CreatePropertyData>;
  setPropertyData: (data: Partial<CreatePropertyData>) => void;
  reset: () => void;
  clearPersistedData: () => void;
};
const getInitialState = () => {
  const stored =
    getDataFromSessStorage<Partial<CreatePropertyData>>('CREATE_PROPERTY');
  return {
    propertyData: stored ?? { listingType: LISTING_TYPE.OWNER },
  };
};
export const useCreatePropertyStore = create<CreatePropertyState>(
  (set, get) => {
    const initialState = getInitialState();

    const persistState = () => {
      const { propertyData } = get();
      saveDataToSessStorage('CREATE_PROPERTY', propertyData);
    };
    return {
      ...initialState,

      setPropertyData: (data) => {
        set((s) => ({ propertyData: { ...s.propertyData, ...data } }));
        persistState();
      },

      reset: () => {
        set({ propertyData: { listingType: LISTING_TYPE.OWNER } });
        persistState();
      },

      clearPersistedData: () => {
        clearDataFromSessStorage('CREATE_PROPERTY');
        get().reset();
      },
    };
  }
);
