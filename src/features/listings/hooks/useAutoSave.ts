import { useEffect, useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export function useAutoSave<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  saveFn: (data: T) => void,
  delay: number = 400
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveFn(value as T);
      }, delay);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [form, delay]);
}

export function useAutoSaveValue<T>(
  value: T,
  saveFn: (data: T) => void,
  delay = 400
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousRef = useRef<T>(value);

  useEffect(() => {
    // Only run when value actually changes
    if (previousRef.current === value) return;
    previousRef.current = value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveFn(value);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, saveFn, delay]);
}
