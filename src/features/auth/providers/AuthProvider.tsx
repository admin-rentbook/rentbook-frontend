import { createContext, useContext, useRef, type ReactNode } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';

type AuthStoreProviderProps = {
  children: ReactNode;
};
type AuthState = {
  step: number;
  next: () => void;
};

type AuthStore = ReturnType<typeof createAuthStore>;

const createAuthStore = (): StoreApi<AuthState> => {
  return createStore<AuthState>((set) => ({
    step: 1,
    next: () =>
      set((state) => ({
        step: state.step + 1,
      })),
  }));
};

const AuthStoreContext = createContext<AuthStore | null>(null);

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (state: AuthState) => T) => {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error('useAuditStore must be used within AuditStoreProvider');
  }
  return useStore(store, selector);
};
