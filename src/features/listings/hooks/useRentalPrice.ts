import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import { RentalPayType, rentalPriceSchema, type RentalPay } from '../constants';
import type { RentalPriceFormValues } from '../types';

export type RentalPrice = {
  onSubmit: (data: RentalPriceFormValues) => void;
  form: UseFormReturn<RentalPriceFormValues>;
  increaseDuration: () => void;
  decreaseDuration: () => void;
  handleSelectTypeChange: (newType: RentalPay) => void;
  isButtonDisabled: boolean;
};
export const useRentalPrice = (
  selectType: RentalPay,
  setSelectType: (value: RentalPay) => void,
  onNext: (() => void) | undefined
): RentalPrice => {
  const form = useForm<RentalPriceFormValues>({
    resolver: zodResolver(rentalPriceSchema),
    mode: 'onChange',
    defaultValues: {
      selectType: selectType,
      rentDuration: 0,
      year: '',
      securityDeposit: '',
    },
  });

  const handleSelectTypeChange = (newType: RentalPay) => {
    setSelectType(newType);
    const currentValues = form.getValues();

    if (newType === RentalPayType.FIXED_PRICE) {
      form.reset({
        selectType: newType,
        rentDuration: currentValues.rentDuration ?? 0,
        year: currentValues.year || '',
        securityDeposit: currentValues.securityDeposit || '',
      });
    } else {
      form.reset({
        selectType: newType,
        rentDuration: currentValues.rentDuration ?? 0,
        year: currentValues.year || '',
        securityDeposit: currentValues.securityDeposit || '',
        bidStartDate: new Date(),
        bidEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
        autoAcceptHighestBidder: false,
        extendLastMinuteBid: false,
      } as RentalPriceFormValues);
    }
  };

  const increaseDuration = () => {
    const current = form.getValues('rentDuration') ?? 0;
    form.setValue('rentDuration', current + 1, {
      shouldValidate: true,
    });
  };

  const decreaseDuration = () => {
    const current = form.getValues('rentDuration') ?? 0;

    if (current > 0) {
      form.setValue('rentDuration', current - 1, {
        shouldValidate: true,
      });
    }
  };

  function onSubmit(data: z.input<typeof rentalPriceSchema>) {
    console.log(data);
    onNext?.();
  }

  const isButtonDisabled = !form.formState.isValid;
  console.log(form.formState.errors);
  console.log(isButtonDisabled);

  return {
    onSubmit,
    form,
    increaseDuration,
    decreaseDuration,
    handleSelectTypeChange,
    isButtonDisabled,
  };
};
