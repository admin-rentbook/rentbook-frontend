import { create } from 'zustand';

type CountStore = {
  count: number;
  increment: () => void;
  incrementAsync: () => Promise<void>;
  decrement: () => void;
};

//create a store in zustand is like creating a hook
export const useCountStore = create<CountStore>((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  incrementAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));
