import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import { useGetRentalPricing, useUpdateRentalPricing } from '../apis';
import { RentalPayType, rentalPriceSchema, type RentalPay } from '../constants';
import { useListingDraft } from '../providers';
import type { RentalPriceFormValues } from '../types';
import {
  formatRentalPriceForForm,
  getDefaultRentalPriceValues,
  transformDTOToFormValues,
} from '../utils';
import { useAutoSave } from './useAutoSave';

export type RentalPrice = {
  onSubmit: (data: RentalPriceFormValues) => void;
  form: UseFormReturn<RentalPriceFormValues>;
  increaseDuration: () => void;
  decreaseDuration: () => void;
  handleSelectTypeChange: (newType: RentalPay) => void;
  isButtonDisabled: boolean;
  isUpdateLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
};
export const useRentalPrice = (
  selectType: RentalPay,
  setSelectType: (value: RentalPay) => void,
  onNext: (() => void) | undefined,
  listingId: number
): RentalPrice => {
  const { updateStepData, draft, updateFromApiResponse } =
    useListingDraft();
  const savedData = draft?.rentalPrice;

  const {
    data: rentalPricingData,
    isPending,
    isFetching,
  } = useGetRentalPricing(listingId);
  const rentalPricing = rentalPricingData?.data;

  const updateRentalPricingMutation = useUpdateRentalPricing();

  const form = useForm<RentalPriceFormValues>({
    resolver: zodResolver(rentalPriceSchema),
    mode: 'onChange',
    defaultValues: rentalPricing
      ? transformDTOToFormValues(rentalPricing)
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

  // Reset form when API data is loaded
  useEffect(() => {
    if (rentalPricing) {
      const formValues = transformDTOToFormValues(rentalPricing);
      form.reset(formValues);

      // Update select type to match API data
      setSelectType(formValues.selectType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentalPricing]);

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
    updateRentalPricingMutation.mutate(
      {
        data,
        listingId: listingId as number,
      },
      {
        onSuccess: (res) => {
          // Update draft with saved data
          const currentDraft = draft?.rentalPrice || {};
          updateStepData('rentalPrice', {
            ...currentDraft,
            rentPriceData: formatRentalPriceForForm(data),
          });

          // Update stepper from API response
          if (res.data.current_step) {
            updateFromApiResponse({
              listing_id: listingId,
              current_step: res.data.current_step,
              status: 'viewing',
            });
          }

          onNext?.();
        },
      }
    );
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    onSubmit,
    form,
    increaseDuration,
    decreaseDuration,
    handleSelectTypeChange,
    isButtonDisabled,
    isUpdateLoading: updateRentalPricingMutation.isPending,
    isPending: isPending && !rentalPricing,
    isFetching,
  };
};
