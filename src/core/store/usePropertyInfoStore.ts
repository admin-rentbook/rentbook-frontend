import type { PropertyDTO } from '@/shared/types';
import {
  clearDataFromSessStorage,
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { create } from 'zustand';

interface PropertyListsStore {
  wishlist: PropertyDTO[];
  waitlist: PropertyDTO[];

  initializeFromStorage: () => void;

  isWishlisted: (propertyId: string) => boolean;
  toggleWishlist: (property: PropertyDTO) => void;
  addToWishlist: (property: PropertyDTO) => void;
  removeFromWishlist: (propertyId: string) => void;
  clearWishlist: () => void;

  isWaitlisted: (propertyId: string) => boolean;
  toggleWaitlist: (property: PropertyDTO) => void;
  addToWaitlist: (property: PropertyDTO) => void;
  removeFromWaitlist: (propertyId: string) => void;
  clearWaitlist: () => void;

  getWishlistCount: () => number;
  getWaitlistCount: () => number;
}

export const usePropertyInfoStore = create<PropertyListsStore>((set, get) => ({
  wishlist: getDataFromSessStorage('wishlist') || [] as PropertyDTO[] | [],
  waitlist: getDataFromSessStorage('wait_list') || [] as PropertyDTO[] | [],

  initializeFromStorage: () => {
    const wishlist = getDataFromSessStorage('wishlist') as PropertyDTO[] | [];
    const waitlist: PropertyDTO[] = getDataFromSessStorage('wait_list') as
      | PropertyDTO[]
      | [];
    set({ wishlist, waitlist });
  },

  isWishlisted: (propertyId: string) => {
    return get().wishlist.some((prop) => prop.id === propertyId);
  },

  toggleWishlist: (property: PropertyDTO) => {
    const { wishlist } = get();
    let newWishlist: PropertyDTO[];

    if (wishlist.some((prop) => prop.id === property.id)) {
      newWishlist = wishlist.filter((prop) => prop.id !== property.id);
      toast.info(`${property.propertyName} removed from wishlist.`);
    } else {
      newWishlist = [...wishlist, property];
      toast.success(`${property.propertyName} added to wishlist.`);
    }

    set({ wishlist: newWishlist });
    saveDataToSessStorage('wishlist', newWishlist);
  },

  addToWishlist: (property: PropertyDTO) => {
    const { wishlist } = get();
    if (!wishlist.some((prop) => prop.id === property.id)) {
      const newWishlist = [...wishlist, property];
      set({ wishlist: newWishlist });
      saveDataToSessStorage('wishlist', newWishlist);
    }
  },

  removeFromWishlist: (propertyId: string) => {
    const newWishlist = get().wishlist.filter((prop) => prop.id !== propertyId);
    set({ wishlist: newWishlist });
    saveDataToSessStorage('wishlist', newWishlist);
  },

  clearWishlist: () => {
    set({ wishlist: [] });
    clearDataFromSessStorage('wishlist');
  },

  // Waitlist actions
  isWaitlisted: (propertyId: string) => {
    return get().waitlist.some((prop) => prop.id === propertyId);
  },

  toggleWaitlist: (property: PropertyDTO) => {
    const { waitlist } = get();
    let newWaitlist: PropertyDTO[];

    if (waitlist.some((prop) => prop.id === property.id)) {
      toast.info(`${property.propertyName} removed from waitlist.`);
      newWaitlist = waitlist.filter((prop) => prop.id !== property.id);
    } else {
      newWaitlist = [...waitlist, property];
      toast.success(`${property.propertyName} added to waitlist.`);
    }

    set({ waitlist: newWaitlist });
    saveDataToSessStorage('wait_list', newWaitlist);
  },

  addToWaitlist: (property: PropertyDTO) => {
    const { waitlist } = get();
    if (!waitlist.some((prop) => prop.id === property.id)) {
      const newWaitlist = [...waitlist, property];
      set({ waitlist: newWaitlist });
      saveDataToSessStorage('wait_list', newWaitlist);
    }
  },

  removeFromWaitlist: (propertyId: string) => {
    const newWaitlist = get().waitlist.filter((prop) => prop.id !== propertyId);
    set({ waitlist: newWaitlist });
    clearDataFromSessStorage('wait_list');
  },

  clearWaitlist: () => {
    set({ waitlist: [] });
    clearDataFromSessStorage('wait_list');
  },

  // Utility getters
  getWishlistCount: () => {
    return get().wishlist.length;
  },

  getWaitlistCount: () => {
    return get().waitlist.length;
  },
}));
