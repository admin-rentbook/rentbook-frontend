import {
  clearDataFromSessStorage,
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import { create } from 'zustand';
import { LISTING_TYPE } from '../constants';
import type {
  CreatePropertyData,
  ListingTypeData,
  PropertyInfoData,
} from '../types/property';

type CreatePropertyState = {
  step: number;
  propertyInfo: Partial<PropertyInfoData>;
  listingInfo: Partial<ListingTypeData>;
  setStep: (value: number | ((prev: number) => number)) => void;
  next: () => void;
  prev: () => void;
  setPropertyInfo: (data: Partial<PropertyInfoData>) => void;
  setListingInfo: (data: Partial<ListingTypeData>) => void;
  getCompleteData: () => Partial<CreatePropertyData>;
  reset: () => void;
  clearPersistedData: () => void;
};
const getInitialState = () => {
  const stored =
    getDataFromSessStorage<Partial<CreatePropertyState>>('CREATE_PROPERTY');
  return {
    step: stored?.step ?? 1,
    propertyInfo: stored?.propertyInfo ?? {},
    listingInfo: stored?.listingInfo ?? { listingType: LISTING_TYPE.OWNER },
  };
};

export const useCreatePropertyStore = create<CreatePropertyState>(
  (set, get) => {
    const initialState = getInitialState();

    const persistState = () => {
      const { step, propertyInfo, listingInfo } = get();
      saveDataToSessStorage('CREATE_PROPERTY', {
        step,
        propertyInfo,
        listingInfo,
      });
    };
    return {
      ...initialState,
      setStep: (value) => {
        if (typeof value === 'function') {
          set((s) => ({ step: (value as (prev: number) => number)(s.step) }));
        } else {
          set({ step: value });
        }
        persistState();
      },
      next: () => {
        (set((s) => ({ step: Math.min(2, s.step + 1) })), persistState());
      },
      prev: () => {
        (set((s) => ({ step: Math.max(1, s.step - 1) })), persistState());
      },
      setPropertyInfo: (data) => {
        (set((s) => ({ propertyInfo: { ...s.propertyInfo, ...data } })),
          persistState());
      },

      setListingInfo: (data) => {
        (set((s) => ({ listingInfo: { ...s.listingInfo, ...data } })),
          persistState());
      },
      getCompleteData: () => {
        const state = get();
        return { ...state.propertyInfo, ...state.listingInfo };
      },
      reset: () =>
        set({
          step: 1,
          propertyInfo: {},
          listingInfo: { listingType: LISTING_TYPE.OWNER },
        }),
      clearPersistedData: () => {
        clearDataFromSessStorage('CREATE_PROPERTY');
        get().reset();
      },
    };
  }
);
