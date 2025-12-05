import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { additionalFeeValSchema } from '../constants';
import type { AdditionalFeeFormValues } from '../types';

type SetState = React.Dispatch<React.SetStateAction<boolean>>;
export const useAdditionalFee = (setIsOpen: SetState) => {
  const [additionalFees, setAdditionalFees] = useState<
    AdditionalFeeFormValues[]
  >([]);
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
    console.log(data);
    setAdditionalFees((prev) => [...prev, data]);
    toast.success(`${data.feeName} fee added successfully`, {
      id: 'add-fee-succ',
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
