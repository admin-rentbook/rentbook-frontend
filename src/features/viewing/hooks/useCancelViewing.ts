import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { cancelReasonSchema } from '../constants/validationSchemas';

export const useCancelViewing = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<z.infer<typeof cancelReasonSchema>>({
    resolver: zodResolver(cancelReasonSchema),
    mode: 'onChange',
    defaultValues: {
      reason: '',
    },
  });

  const isButtonDisabled = !form.formState.isValid;

  const onSubmit = (data: z.infer<typeof cancelReasonSchema>) => {
    console.log('Cancellation reason:', data);
    // Handle cancellation logic here
    setShowSuccessModal(true);
  };

  return {
    form,
    isButtonDisabled,
    showSuccessModal,
    setShowSuccessModal,
    onSubmit,
  };
};