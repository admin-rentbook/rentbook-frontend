import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import { RentalPayType, rentalPriceSchema, type RentalPay } from '../constants';
import { useListingDraft } from '../providers';
import type { RentalPriceFormValues } from '../types';
import {
  formatRentalPriceForForm,
  getDefaultRentalPriceValues,
} from '../utils';
import { useAutoSave } from './useAutoSave';

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
  const { updateStepData, markMainStepComplete, markStepComplete, draft } =
    useListingDraft();
  const savedData = draft?.rentalPrice;
  const form = useForm<RentalPriceFormValues>({
    resolver: zodResolver(rentalPriceSchema),
    mode: 'onChange',
    defaultValues: draft?.rentalPrice?.rentPriceData
      ? formatRentalPriceForForm(draft.rentalPrice.rentPriceData)
      : selectType === RentalPayType.FIXED_PRICE
        ? {
            selectType: RentalPayType.FIXED_PRICE,
            rentalPrice: undefined,
            rentDuration: undefined,
            year: '',
            securityDeposit: undefined,
          }
        : {
            selectType: RentalPayType.TIMED_AUCTION,
            bidPrice: undefined,
            rentDuration: undefined,
            year: '',
            securityDeposit: undefined,
            bidStartDate: '',
            bidEndDate: '',
            autoAcceptHighestBidder: false,
            extendLastMinuteBid: false,
          },
  });

  useAutoSave(form, (value) => {
    const currentDraft = draft?.rentalPrice;
    updateStepData('rentalPrice', {
      ...currentDraft,
      rentPriceData: formatRentalPriceForForm(value),
    });
  });

  const handleSelectTypeChange = (newType: RentalPay) => {
    setSelectType(newType);
    const currentValues = form.getValues();
    const newFormData = getDefaultRentalPriceValues(
      newType,
      {
        rentDuration: currentValues.rentDuration,
        year: currentValues.year,
        securityDeposit: currentValues.securityDeposit,
      },
      savedData
    );

    form.reset(newFormData);
    const currentDraft = draft?.rentalPrice || {};
    updateStepData('rentalPrice', {
      ...currentDraft,
      rentPriceData: newFormData,
    });
  };

  const increaseDuration = () => {
    const current = form.getValues('rentDuration');
    const numValue =
      typeof current === 'string' ? parseInt(current, 10) : current;
    const newValue = (numValue || 0) + 1;

    form.setValue('rentDuration', newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const decreaseDuration = () => {
    const current = form.getValues('rentDuration');
    const numValue =
      typeof current === 'string' ? parseInt(current, 10) : current;

    if (numValue && numValue > 0) {
      form.setValue('rentDuration', numValue - 1, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  function onSubmit(data: z.infer<typeof rentalPriceSchema>) {
    const currentDraft = draft?.rentalPrice || {};
    updateStepData('rentalPrice', {
      ...currentDraft,
      rentPriceData: formatRentalPriceForForm(data),
    });
    markStepComplete(1, 0);
    markMainStepComplete(1);
    onNext?.();
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    onSubmit,
    form,
    increaseDuration,
    decreaseDuration,
    handleSelectTypeChange,
    isButtonDisabled,
  };
};
