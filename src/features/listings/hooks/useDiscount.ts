import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import {
  useGetDiscount,
  useUpdateDiscount,
} from '../apis';
import { discountValidationSchema } from '../constants';
import type { DiscountFormValues } from '../types';
import { transformDiscountDTOToFormValues } from '../types/mappedTypes';

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

export const useDiscount = (setIsOpen: SetState, listingId: number) => {
  const { data: discountData, isPending, isFetching } = useGetDiscount(listingId);
  const discountFromAPI = discountData?.data;

  const updateDiscountMutation = useUpdateDiscount();

  const [hasDiscount, setHasDiscount] = useState(false);

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountValidationSchema),
    mode: 'onChange',
    defaultValues: {
      discount: undefined,
      duration: '',
    },
  });

  // Auto-populate form with API data
  useEffect(() => {
    if (discountFromAPI) {
      const formValues = transformDiscountDTOToFormValues(discountFromAPI);
      if (formValues) {
        form.reset(formValues);
        setHasDiscount(true);
      }
    }
  }, [discountFromAPI]);

  function onSubmit(data: z.input<typeof discountValidationSchema>) {
    updateDiscountMutation.mutate(
      {
        discount: data,
        listingId: listingId as number,
      },
      {
        onSuccess: (res) => {
          // Transform the API response to form values
          if (res.data) {
            const formValues = transformDiscountDTOToFormValues(res.data);
            if (formValues) {
              form.reset(formValues);
              setHasDiscount(true);
            }
          }

          setIsOpen(false);
        },
      }
    );
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    formDiscount: form,
    onSubmitDiscount: onSubmit,
    isButtonDisabledDiscount: isButtonDisabled,
    hasDiscount,
    isLoadingAddDis: updateDiscountMutation.isPending,
    isLoadingDiscount: isPending,
    isFetchingDiscount: isFetching,
  };
};
