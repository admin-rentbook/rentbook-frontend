import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CreatePropertyState = {
  step: number; // 1-based step index
  setStep: (value: number | ((prev: number) => number)) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
};

export const useCreatePropertyStore = create<CreatePropertyState>()(
  persist(
    (set) => ({
      step: 1,
      setStep: (value: number | ((prev: number) => number)) => {
        if (typeof value === 'function') {
          set((s) => ({ step: (value as (prev: number) => number)(s.step) }));
        } else {
          set({ step: value });
        }
      },
      next: () => set((s) => ({ step: Math.min(2, s.step + 1) })), // clamp to max steps (2 here)
      prev: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
      reset: () => set({ step: 1 }),
    }),
    {
      name: 'create-property-step', // localStorage key
      // you can add serialize/deserialize if you need custom behaviour
    }
  )
);
