import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useDeleteAdditionalFees, useGetAdditionalFees, useUpdateAdditionalFees } from '../apis';
import { additionalFeeValSchema } from '../constants';
import type { AdditionalFeeFormValues } from '../types';
import { transformAdditionalFeesDTOToFormValues } from '../types/mappedTypes';

type SetState = React.Dispatch<React.SetStateAction<boolean>>;
export const useAdditionalFee = (setIsOpen: SetState, listingId: number) => {

  const { data: additionalFeesData, isPending, isFetching } =
    useGetAdditionalFees(listingId);
  const additionalFeesFromAPI = additionalFeesData?.data;

  const updateAdditionalFeesMutation = useUpdateAdditionalFees();
  const deleteAdditionalFeesMutation = useDeleteAdditionalFees();

  const [additionalFees, setAdditionalFees] = useState<
    AdditionalFeeFormValues[]
  >([]);

  useEffect(() => {
    if (additionalFeesFromAPI) {
      const formValues = transformAdditionalFeesDTOToFormValues(
        additionalFeesFromAPI
      );
      setAdditionalFees(formValues);
    }
  }, [additionalFeesFromAPI]);

  const form = useForm<AdditionalFeeFormValues>({
    resolver: zodResolver(additionalFeeValSchema),
    mode: 'onChange',
    defaultValues: {
      feeName: '',
      paymentFrequency: '',
      amount: undefined,
      feeRequirement: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof additionalFeeValSchema>) {
    const newAdditionalFees = [...additionalFees, data];

    updateAdditionalFeesMutation.mutate(
      {
        fees: newAdditionalFees,
        listingId: listingId as number,
      },
      {
        onSuccess: (res) => {
          // Transform the API response to form values
          if (res.data) {
            const formValues = transformAdditionalFeesDTOToFormValues(res.data);
            setAdditionalFees(formValues);
          }

          setIsOpen(false);
          form.reset();
        },
      }
    );
  }

  const handleDeleteAllFees = () => {
    deleteAdditionalFeesMutation.mutate(
      {
        listingId: listingId as number,
      },
      {
        onSuccess: () => {
          setAdditionalFees([]);
        },
      }
    );
  };

  const isButtonDisabled = !form.formState.isValid;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    additionalFees,
    isLoadingAddFee: updateAdditionalFeesMutation.isPending,
    isLoadingFees: isPending,
    isFetchingFees: isFetching,
    handleDeleteAllFees,
    isDeleting: deleteAdditionalFeesMutation.isPending,
  };
};
