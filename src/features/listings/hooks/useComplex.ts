import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import { useCreateComplex } from '../apis';
import { createComplexSchema } from '../constants';

export type ComplexState = 'ADD_TO_COMPLEX' | 'CREATE_COMPLEX';
export type ComplexFormData = UseFormReturn<{ complexName: string }>;

type SetOpenComplex = React.Dispatch<React.SetStateAction<boolean>>;
export const useComplex = (
  setOpenComplex: SetOpenComplex,
  propertyId?: number
) => {
  const [complexState, setComplexState] = useState<
    'ADD_TO_COMPLEX' | 'CREATE_COMPLEX'
  >('ADD_TO_COMPLEX');
  const createComplexMutation = useCreateComplex();
  const form = useForm<{ complexName: string }>({
    resolver: zodResolver(createComplexSchema),
    mode: 'onChange',
    defaultValues: {
      complexName: '',
    },
  });

  function onSubmit(data: z.infer<typeof createComplexSchema>) {
    createComplexMutation.mutate(
      { complexName: data.complexName, propertyId: propertyId as number },
      {
        onSuccess: () => {
          setOpenComplex(false);
          form.reset();
          setComplexState('ADD_TO_COMPLEX');
        },
      }
    );
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    formComplex: form,
    isComplexBtnDisabled: isButtonDisabled,
    onComplexSubmit: onSubmit,
    complexState,
    setComplexState,
    isLoading: createComplexMutation.isPending,
  };
};
