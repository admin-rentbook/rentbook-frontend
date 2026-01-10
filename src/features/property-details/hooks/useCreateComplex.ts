import { useCreateComplexMutation } from '@/features/listings/apis';
import { createComplexSchema } from '@/features/listings/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';

export const useCreateComplex = () => {
  const [openComplex, setOpenComplex] = useState(false);
  const { propertyId } = useSearch({
    from: '/property-details',
  });

  const createComplexMutation = useCreateComplexMutation();

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
        },
      }
    );
  }

  const isButtonDisabled =
    !form.formState.isValid || createComplexMutation.isPending;

  return {
    form,
    isButtonDisabled,
    onSubmit,
    openComplex,
    setOpenComplex,
  };
};
