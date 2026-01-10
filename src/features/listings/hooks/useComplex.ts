import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import { useCreateComplexMutation, useGetComplexes } from '../apis';
import { createComplexSchema } from '../constants';

export type ComplexState = 'ADD_TO_COMPLEX' | 'CREATE_COMPLEX';
export type ComplexFormData = UseFormReturn<{ complexName: string }>;

type SetOpenComplex = React.Dispatch<React.SetStateAction<boolean>>;
type OnComplexSelect = (complexId: number, complexName: string) => void;

export const useComplex = (
  setOpenComplex: SetOpenComplex,
  propertyId?: number,
  onComplexSelect?: OnComplexSelect
) => {
  const [complexState, setComplexState] =
    useState<ComplexState>('ADD_TO_COMPLEX');

  // Fetch existing complexes
  const { data: complexesData, isPending: isLoadingComplexes } =
    useGetComplexes();

  const complexes = complexesData?.data;
  const createComplexMutation = useCreateComplexMutation();

  const form = useForm<{ complexName: string }>({
    resolver: zodResolver(createComplexSchema),
    mode: 'onChange',
    defaultValues: {
      complexName: '',
    },
  });

  useEffect(() => {
    if (!isLoadingComplexes && complexes !== undefined) {
      if (complexes.length === 0) {
        setComplexState('CREATE_COMPLEX');
      } else {
        setComplexState('ADD_TO_COMPLEX');
      }
    }
  }, [complexes, isLoadingComplexes]);

  function onSubmit(data: z.infer<typeof createComplexSchema>) {
    createComplexMutation.mutate(
      { complexName: data.complexName, propertyId: propertyId as number },
      {
        onSuccess: (res) => {
          // Auto-select the newly created complex
          if (onComplexSelect && res.data.id) {
            onComplexSelect(res.data.id as number, data.complexName);
          }

          setOpenComplex(false);
          form.reset();
          setComplexState('ADD_TO_COMPLEX');
        },
      }
    );
  }

  const isButtonDisabled =
    !form.formState.isValid || createComplexMutation.isPending;

  return {
    formComplex: form,
    isComplexBtnDisabled: isButtonDisabled,
    onComplexSubmit: onSubmit,
    complexState,
    setComplexState,
    isLoading: createComplexMutation.isPending,
    complexes,
    isLoadingComplexes,
  };
};
