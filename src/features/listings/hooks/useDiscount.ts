import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { discountValidationSchema } from '../constants';
import type { DiscountFormValues } from '../types';

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

export const useDiscount = (setIsOpen: SetState) => {
  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountValidationSchema),
    mode: 'onChange',
    defaultValues: {
      discount: '',
      duration: '',
    },
  });

  function onSubmit(data: z.input<typeof discountValidationSchema>) {
    console.log(data);
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
