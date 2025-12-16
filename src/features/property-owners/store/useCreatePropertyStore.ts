import { create } from 'zustand';
import { LISTING_TYPE } from '../constants';
import type { CreatePropertyData } from '../types/property';

type CreatePropertyState = {
  propertyData: Partial<CreatePropertyData>;
  setPropertyData: (data: Partial<CreatePropertyData>) => void;
  reset: () => void;
};

export const useCreatePropertyStore = create<CreatePropertyState>((set) => {
  return {
    propertyData: {},

    setPropertyData: (data) => {
      set((s) => ({ propertyData: { ...s.propertyData, ...data } }));
    },

    reset: () => {
      set({ propertyData: { listingType: LISTING_TYPE.OWNER } });
    },
  };
});
