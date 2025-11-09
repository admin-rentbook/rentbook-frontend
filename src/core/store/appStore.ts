import type { UserType } from '@/shared/constants';
import { getDataFromLocalStorage } from '@/shared/utils/helpers';
import { create } from 'zustand';

type AppStore = {
  userType: UserType | null;
  setUserType: (userType: UserType) => void;
  isOpenAuth: boolean;
  onOpenAuth: (open: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  userType: getDataFromLocalStorage('userType') || null,
  setUserType: (userType: UserType) => {
    set({
      userType: userType,
    });
  },
  isOpenAuth: false,
  onOpenAuth: (open) => set({ isOpenAuth: open }),
}));
