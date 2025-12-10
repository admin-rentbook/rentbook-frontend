import { formatForDateInput } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { discountValidationSchema } from '../constants';
import { useListingDraft } from '../providers';
import type { DiscountFormValues, RentalPriceData } from '../types';

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

export const useDiscount = (setIsOpen: SetState) => {
  const { updateStepData, getStepData } = useListingDraft();
  const savedData = getStepData('rentalPrice');

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountValidationSchema),
    mode: 'onChange',
    defaultValues: savedData?.discount || {
      discount: undefined,
      duration: '',
    },
  });
  function onSubmit(data: z.input<typeof discountValidationSchema>) {
    updateStepData('rentalPrice', {
      ...savedData,
      discount: {
        discount: data.discount,
        duration: formatForDateInput(data.duration as string),
      },
    } as RentalPriceData);
    toast.success(`Discount added successfully`, {
      id: 'dis-succ',
    });
    setIsOpen(false);
    form.reset();
  }
  const isButtonDisabled = !form.formState.isValid;

  return {
    formDiscount: form,
    onSubmitDiscount: onSubmit,
    isButtonDisabledDiscount: isButtonDisabled,
  };
};
