import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { additionalFeeValSchema } from '../constants';
import { useListingDraft } from '../providers';
import type { AdditionalFeeFormValues, RentalPriceData } from '../types';

type SetState = React.Dispatch<React.SetStateAction<boolean>>;
export const useAdditionalFee = (setIsOpen: SetState) => {
  const { updateStepData, getStepData } = useListingDraft();
  const savedData = getStepData('rentalPrice');

  const [additionalFees, setAdditionalFees] = useState<
    AdditionalFeeFormValues[]
  >(savedData?.additionalPrice || []);

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

    setAdditionalFees(newAdditionalFees);
    updateStepData('rentalPrice', {
      ...savedData,
      additionalPrice: newAdditionalFees,
    } as RentalPriceData);
    toast.success(`${data.feeName} fee added successfully`, {
      id: 'add-fee-success',
    });

    setIsOpen(false);
    form.reset();
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    additionalFees,
  };
};
