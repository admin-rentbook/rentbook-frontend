import type { LocationResult } from '@/shared/types';
import { create } from 'zustand';
import { LISTING_TYPE } from '../constants';
import type { CreatePropertyData } from '../types/property';

type CreatePropertyState = {
  propertyData: Partial<CreatePropertyData>;
  locationResult: LocationResult | null;
  setPropertyData: (data: Partial<CreatePropertyData>) => void;
  setLocationResult?: (data: LocationResult) => void;
  reset: () => void;
};

export const useCreatePropertyStore = create<CreatePropertyState>((set) => {
  return {
    propertyData: {},
    locationResult: null,

    setPropertyData: (data) => {
      set((s) => ({ propertyData: { ...s.propertyData, ...data } }));
    },

    setLocationResult: (data) => {
      set(() => ({ locationResult: data }));
    },

    reset: () => {
      set({ propertyData: { listedBy: LISTING_TYPE.OWNER } });
    },
  };
});
