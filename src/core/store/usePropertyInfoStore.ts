import type { ListingDTO } from '@/shared/types';
import {
  clearDataFromSessStorage,
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import { toast } from 'sonner';
import { create } from 'zustand';

interface PropertyListsStore {
  wishlist: ListingDTO[];
  waitlist: ListingDTO[];

  initializeFromStorage: () => void;

  isWishlisted: (propertyId: number) => boolean;
  toggleWishlist: (property: ListingDTO) => void;
  addToWishlist: (property: ListingDTO) => void;
  removeFromWishlist: (propertyId: number) => void;
  clearWishlist: () => void;

  isWaitlisted: (propertyId: number) => boolean;
  toggleWaitlist: (property: ListingDTO) => void;
  addToWaitlist: (property: ListingDTO) => void;
  removeFromWaitlist: (propertyId: number) => void;
  clearWaitlist: () => void;

  getWishlistCount: () => number;
  getWaitlistCount: () => number;
}

export const usePropertyInfoStore = create<PropertyListsStore>((set, get) => ({
  wishlist: getDataFromSessStorage('wishlist') || [] as ListingDTO[] | [],
  waitlist: getDataFromSessStorage('wait_list') || [] as ListingDTO[] | [],

  initializeFromStorage: () => {
    const wishlist = getDataFromSessStorage('wishlist') as ListingDTO[] | [];
    const waitlist: ListingDTO[] = getDataFromSessStorage('wait_list') as
      | ListingDTO[]
      | [];
    set({ wishlist, waitlist });
  },

  isWishlisted: (propertyId: number) => {
    return get().wishlist.some((prop) => prop.id === propertyId);
  },

  toggleWishlist: (property: ListingDTO) => {
    const { wishlist } = get();
    let newWishlist: ListingDTO[];

    if (wishlist.some((prop) => prop.id === property.id)) {
      newWishlist = wishlist.filter((prop) => prop.id !== property.id);
      toast.info(`${property.title} removed from wishlist.`);
    } else {
      newWishlist = [...wishlist, property];
      toast.success(`${property.title} added to wishlist.`);
    }

    set({ wishlist: newWishlist });
    saveDataToSessStorage('wishlist', newWishlist);
  },

  addToWishlist: (property: ListingDTO) => {
    const { wishlist } = get();
    if (!wishlist.some((prop) => prop.id === property.id)) {
      const newWishlist = [...wishlist, property];
      set({ wishlist: newWishlist });
      saveDataToSessStorage('wishlist', newWishlist);
    }
  },

  removeFromWishlist: (propertyId: number) => {
    const newWishlist = get().wishlist.filter((prop) => prop.id !== propertyId);
    set({ wishlist: newWishlist });
    saveDataToSessStorage('wishlist', newWishlist);
  },

  clearWishlist: () => {
    set({ wishlist: [] });
    clearDataFromSessStorage('wishlist');
  },

  // Waitlist actions
  isWaitlisted: (propertyId: number) => {
    return get().waitlist.some((prop) => prop.id === propertyId);
  },

  toggleWaitlist: (property: ListingDTO) => {
    const { waitlist } = get();
    let newWaitlist: ListingDTO[];

    if (waitlist.some((prop) => prop.id === property.id)) {
      toast.info(`${property.title} removed from waitlist.`);
      newWaitlist = waitlist.filter((prop) => prop.id !== property.id);
    } else {
      newWaitlist = [...waitlist, property];
      toast.success(`${property.title} added to waitlist.`);
    }

    set({ waitlist: newWaitlist });
    saveDataToSessStorage('wait_list', newWaitlist);
  },

  addToWaitlist: (property: ListingDTO) => {
    const { waitlist } = get();
    if (!waitlist.some((prop) => prop.id === property.id)) {
      const newWaitlist = [...waitlist, property];
      set({ waitlist: newWaitlist });
      saveDataToSessStorage('wait_list', newWaitlist);
    }
  },

  removeFromWaitlist: (propertyId: number) => {
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
