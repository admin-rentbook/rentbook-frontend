import type { AuthUser } from '@/features/auth/types';
import type { UserType } from '@/shared/constants';
import {
  clearDataFromLocalStorage,
  clearDataFromSessStorage,
  getDataFromLocalStorage,
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '@/shared/utils/helpers';
import { create } from 'zustand';

type AppStore = {
  userType: UserType | null;
  setUserType: (userType: UserType) => void;

  authUser: AuthUser | null;
  setAuthUser: (authUser: AuthUser | null) => void;

  isOpenAuth: boolean;
  onOpenAuth: (open: boolean) => void;
  isOpenGetStarted: boolean;
  onOpenGetStarted: (open: boolean) => void;
  logout: () => void;
};

const getInitialAuthUserState = (): AuthUser | null => {
  const storedAuthUser = getDataFromSessStorage<Partial<AuthUser>>('auth_user');
  return storedAuthUser ? (storedAuthUser as AuthUser) : null;
};

export const useAppStore = create<AppStore>((set) => ({
  userType: getDataFromLocalStorage('userType') || null,
  setUserType: (userType: UserType) => {
    set({
      userType: userType,
    });
  },
  authUser: getInitialAuthUserState(),
  setAuthUser: (authUser) => {
    set({ authUser });
    if (authUser) {
      saveDataToSessStorage('auth_user', authUser);
    } else {
      clearDataFromSessStorage('auth_user');
    }
  },
  isOpenAuth: false,
  onOpenAuth: (open) => set({ isOpenAuth: open }),
  isOpenGetStarted: false,
  onOpenGetStarted: (open) => set({ isOpenGetStarted: open }),

  logout: () => {
    set({ authUser: null, userType: null });
    clearDataFromSessStorage('auth_user');
    clearDataFromLocalStorage('userType');
    clearDataFromSessStorage('verify-timer')
    clearDataFromSessStorage('email')
    clearDataFromLocalStorage('CREATE_PROPERTY')
  },
}));
